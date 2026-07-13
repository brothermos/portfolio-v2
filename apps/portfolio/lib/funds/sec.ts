import { classicPivotPoints } from "@/lib/stocks/pivot";
import type {
  ChartPoint,
  ChartRangeId,
  StockChartSeries,
  StockQuote,
  SupportResistanceLevels,
} from "@/lib/stocks/types";

import {
  getSeedFund,
  isSeedFundSymbol,
  SEED_FUNDS,
  type SeedFund,
} from "./watchlist";

export type FundPreviewItem = {
  symbol: string;
  title: string;
  name: string;
  amcName: string;
  nav: number;
  changePercent: number;
  currency: string;
  asOfDate: string;
};

export class FundDataError extends Error {
  constructor(
    message: string,
    readonly status: number = 502,
  ) {
    super(message);
    this.name = "FundDataError";
  }
}

type SecNavItem = {
  proj_id?: string;
  fund_class_name?: string;
  nav_date?: string;
  last_val?: number | null;
  net_asset?: number | null;
};

type FundNavSeries = {
  fund: SeedFund;
  quotes: Array<{ date: string; navPerUnit: number }>;
};

const SEC_API_BASE = "https://api.sec.or.th/v2";
const FUND_LOOKBACK_DAYS = 5;
/** NAV รายวัน — ดึงเผื่อวันหยุด/คิว SEC ช้า */
const DEFAULT_NAV_LOOKBACK_DAYS = 21;

export { isSeedFundSymbol };

function requireSecApiKey(): string {
  const key = process.env.SEC_API_KEY?.trim();
  if (!key) {
    throw new FundDataError("ยังไม่ได้ตั้งค่า SEC_API_KEY", 500);
  }
  return key;
}

function toDateKey(value: string | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
}

function isoDateUtc(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

async function secGet<T>(
  path: string,
  query: Record<string, string | number | undefined>,
): Promise<T> {
  const key = requireSecApiKey();
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === "") continue;
    params.set(k, String(v));
  }

  const response = await fetch(`${SEC_API_BASE}${path}?${params}`, {
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (response.status === 401 || response.status === 403) {
    throw new FundDataError("SEC API key ไม่ถูกต้องหรือไม่มีสิทธิ์", 502);
  }
  if (response.status === 204) {
    return { message: "success", items: [], next_cursor: "" } as T;
  }
  if (!response.ok) {
    throw new FundDataError(`ดึงข้อมูลจาก SEC ไม่สำเร็จ (${response.status})`, 502);
  }

  return (await response.json()) as T;
}

async function fetchAllNavPages(options: {
  projId: string;
  fundClassName: string;
  startNavDate: string;
  endNavDate: string;
}): Promise<SecNavItem[]> {
  const items: SecNavItem[] = [];
  let cursor = "";

  for (let page = 0; page < 50; page++) {
    const body = await secGet<{
      items?: SecNavItem[];
      next_cursor?: string;
    }>("/fund/daily-info/nav", {
      proj_id: options.projId,
      fund_class_name: options.fundClassName,
      start_nav_date: options.startNavDate,
      end_nav_date: options.endNavDate,
      page_size: 100,
      next_cursor: cursor || undefined,
    });

    const batch = body.items ?? [];
    items.push(...batch);
    cursor = body.next_cursor ?? "";
    if (!cursor || batch.length === 0) break;
  }

  return items;
}

function normalizeQuotes(items: SecNavItem[]): Array<{ date: string; navPerUnit: number }> {
  const byDate = new Map<string, number>();
  for (const item of items) {
    if (typeof item.last_val !== "number" || Number.isNaN(item.last_val)) continue;
    if (!item.nav_date) continue;
    byDate.set(toDateKey(item.nav_date), item.last_val);
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, navPerUnit]) => ({ date, navPerUnit }));
}

async function fetchFundNavSeries(
  symbol: string,
  startDate: string | null,
  endDate: Date = new Date(),
): Promise<FundNavSeries> {
  const fund = getSeedFund(symbol);
  if (!fund) {
    throw new FundDataError(`ไม่รองรับกองทุน ${symbol}`, 400);
  }

  const end = isoDateUtc(endDate);
  const start =
    startDate ??
    isoDateUtc(addUtcDays(endDate, -Math.max(DEFAULT_NAV_LOOKBACK_DAYS, 4000)));

  const raw = await fetchAllNavPages({
    projId: fund.projId,
    fundClassName: fund.fundClassName,
    startNavDate: start,
    endNavDate: end,
  });
  const quotes = normalizeQuotes(raw);

  if (quotes.length === 0) {
    throw new FundDataError(`ไม่พบ NAV ของ ${symbol}`, 404);
  }

  return { fund, quotes };
}

function latestNav(quotes: Array<{ date: string; navPerUnit: number }>): {
  nav: number;
  date: string;
  change: number;
  changePercent: number;
} {
  const last = quotes[quotes.length - 1]!;
  const prev = quotes[quotes.length - 2];
  const change =
    prev && typeof prev.navPerUnit === "number" ? last.navPerUnit - prev.navPerUnit : 0;
  const changePercent =
    prev && prev.navPerUnit !== 0 ? (change / prev.navPerUnit) * 100 : 0;

  return {
    nav: last.navPerUnit,
    date: last.date,
    change,
    changePercent,
  };
}

export async function fetchFundPreview(): Promise<FundPreviewItem[]> {
  const end = new Date();
  const start = isoDateUtc(addUtcDays(end, -DEFAULT_NAV_LOOKBACK_DAYS));

  const results: Array<FundPreviewItem | null> = await Promise.all(
    SEED_FUNDS.map(async (fund): Promise<FundPreviewItem | null> => {
      try {
        const series = await fetchFundNavSeries(fund.symbol, start, end);
        const latest = latestNav(series.quotes);
        return {
          symbol: fund.symbol,
          title: fund.title,
          name: fund.name,
          amcName: fund.amcName,
          nav: latest.nav,
          changePercent: latest.changePercent,
          currency: "THB",
          asOfDate: latest.date,
        };
      } catch {
        return null;
      }
    }),
  );

  const items = results.filter((item): item is FundPreviewItem => item != null);
  if (items.length === 0) {
    throw new FundDataError("ดึงข้อมูลกองทุนจาก SEC ไม่สำเร็จ", 502);
  }
  return items;
}

export async function fetchFundQuote(symbol: string): Promise<StockQuote> {
  const end = new Date();
  const start = isoDateUtc(addUtcDays(end, -DEFAULT_NAV_LOOKBACK_DAYS));
  const series = await fetchFundNavSeries(symbol, start, end);
  const latest = latestNav(series.quotes);

  return {
    symbol: series.fund.symbol,
    name: series.fund.name,
    price: latest.nav,
    change: latest.change,
    changePercent: latest.changePercent,
    currency: "THB",
    marketState: "CLOSED",
    updatedAt: new Date().toISOString(),
  };
}

/**
 * กองทุนมีแค่ NAV รายวัน ไม่มี OHLC จริง
 * ใช้ช่วง NAV ย้อนหลังสั้นๆ เป็น High/Low และ NAV วันก่อนเป็น Close
 */
export async function fetchFundLevels(symbol: string): Promise<SupportResistanceLevels> {
  const end = new Date();
  const start = isoDateUtc(addUtcDays(end, -Math.max(DEFAULT_NAV_LOOKBACK_DAYS, 30)));
  const series = await fetchFundNavSeries(symbol, start, end);

  if (series.quotes.length < 2) {
    throw new FundDataError(`ประวัติ NAV ของ ${symbol} ไม่เพียงพอ`, 502);
  }

  const history = series.quotes.slice(0, -1);
  const window = history.slice(-FUND_LOOKBACK_DAYS);
  if (window.length === 0) {
    throw new FundDataError(`ประวัติ NAV ของ ${symbol} ไม่เพียงพอ`, 502);
  }

  const values = window.map((q) => q.navPerUnit);
  const close = values[values.length - 1]!;
  const high = Math.max(...values);
  const low = Math.min(...values);
  const date = window[window.length - 1]!.date;

  const priorDay = { open: close, high, low, close, date };

  return {
    symbol: series.fund.symbol,
    priorDay,
    levels: classicPivotPoints(priorDay),
  };
}

function rangeStartDate(range: ChartRangeId, now: Date): Date | null {
  const d = new Date(now);
  switch (range) {
    case "1D":
    case "5D":
      d.setUTCDate(d.getUTCDate() - 14);
      return d;
    case "1M":
      d.setUTCMonth(d.getUTCMonth() - 1);
      return d;
    case "6M":
      d.setUTCMonth(d.getUTCMonth() - 6);
      return d;
    case "YTD":
      return new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    case "1Y":
      d.setUTCFullYear(d.getUTCFullYear() - 1);
      return d;
    case "5Y":
      d.setUTCFullYear(d.getUTCFullYear() - 5);
      return d;
    case "MAX":
      return null;
  }
}

export async function fetchFundChart(
  symbol: string,
  range: ChartRangeId,
): Promise<StockChartSeries> {
  const end = new Date();
  const startDate = rangeStartDate(range, end);
  const start = startDate ? isoDateUtc(startDate) : null;
  const series = await fetchFundNavSeries(symbol, start, end);

  const points: ChartPoint[] = series.quotes.map((q) => ({
    time: q.date,
    value: q.navPerUnit,
  }));

  if (points.length === 0) {
    throw new FundDataError(`ไม่พบกราฟ NAV ของ ${symbol}`, 404);
  }

  return {
    symbol: series.fund.symbol,
    range,
    currency: "THB",
    points,
  };
}
