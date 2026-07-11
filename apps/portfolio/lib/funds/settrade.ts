import { classicPivotPoints } from "@/lib/stocks/pivot";
import type {
  ChartPoint,
  ChartRangeId,
  StockChartSeries,
  StockQuote,
  SupportResistanceLevels,
} from "@/lib/stocks/types";

import { SEED_FUNDS, type SeedFundSymbol } from "./watchlist";

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

type SettradeOverviewInfo = {
  symbol?: string;
  name?: string;
  amcName?: string;
  navPerUnit?: number;
  date?: string;
  currency?: string;
};

type SettradeQuote = {
  date?: string;
  navPerUnit?: number;
};

type FundPageData = {
  symbol: string;
  title: string;
  name: string;
  amcName: string;
  currency: string;
  info: SettradeOverviewInfo;
  quotes: SettradeQuote[];
};

const FUND_LOOKBACK_DAYS = 5;

function extractNuxt(html: string): unknown {
  const match = html.match(/window\.__NUXT__\s*=([\s\S]*?)<\/script>/);
  if (!match?.[1]) {
    throw new FundDataError("ไม่พบข้อมูลกองทุนจาก Settrade", 502);
  }
  try {
    return Function(`"use strict"; return (${match[1].replace(/;$/, "")})`)();
  } catch {
    throw new FundDataError("แปลงข้อมูลกองทุนไม่สำเร็จ", 502);
  }
}

function toDateKey(value: string | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
}

function fundTitle(symbol: string): string {
  return SEED_FUNDS.find((f) => f.symbol === symbol)?.title ?? symbol;
}

export function isSeedFundSymbol(symbol: string): symbol is SeedFundSymbol {
  return SEED_FUNDS.some((f) => f.symbol === symbol);
}

async function fetchFundPage(symbol: string): Promise<FundPageData> {
  if (!isSeedFundSymbol(symbol) && !/^[A-Z0-9][A-Z0-9-]{1,24}$/i.test(symbol)) {
    throw new FundDataError("รูปแบบรหัสกองทุนไม่ถูกต้อง", 400);
  }

  const response = await fetch(
    `https://www.settrade.com/th/mutualfund/quote/${encodeURIComponent(symbol)}/overview`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WealthStocks/0.1; +https://github.com/brothermos/wealth-portfolio)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(15_000),
    },
  );

  if (!response.ok) {
    throw new FundDataError(`ดึงข้อมูล ${symbol} ไม่สำเร็จ (${response.status})`, 502);
  }

  const html = await response.text();
  const nuxt = extractNuxt(html) as {
    state?: {
      mutualfund?: {
        overviewInfo?: SettradeOverviewInfo;
        quotationChart?: { quotations?: SettradeQuote[] };
      };
    };
  };

  const info = nuxt.state?.mutualfund?.overviewInfo ?? {};
  const quotes = (nuxt.state?.mutualfund?.quotationChart?.quotations ?? []).filter(
    (q) => typeof q.navPerUnit === "number" && !Number.isNaN(q.navPerUnit),
  );

  if (quotes.length === 0 && typeof info.navPerUnit !== "number") {
    throw new FundDataError(`ไม่พบ NAV ของ ${symbol}`, 404);
  }

  return {
    symbol: info.symbol ?? symbol,
    title: fundTitle(symbol),
    name: info.name ?? fundTitle(symbol),
    amcName: info.amcName ?? "",
    currency: info.currency ?? "THB",
    info,
    quotes,
  };
}

function latestNav(page: FundPageData): { nav: number; date: string; changePercent: number } {
  const last = page.quotes[page.quotes.length - 1];
  const prev = page.quotes[page.quotes.length - 2];
  const nav = page.info.navPerUnit ?? last?.navPerUnit;
  if (typeof nav !== "number" || Number.isNaN(nav)) {
    throw new FundDataError(`ไม่พบ NAV ของ ${page.symbol}`, 404);
  }
  const prevNav = prev?.navPerUnit;
  const changePercent =
    typeof prevNav === "number" && prevNav !== 0
      ? ((nav - prevNav) / prevNav) * 100
      : 0;
  return {
    nav,
    date: toDateKey(page.info.date ?? last?.date),
    changePercent,
  };
}

export async function fetchFundPreview(): Promise<FundPreviewItem[]> {
  const results: Array<FundPreviewItem | null> = await Promise.all(
    SEED_FUNDS.map(async (fund): Promise<FundPreviewItem | null> => {
      try {
        const page = await fetchFundPage(fund.symbol);
        const latest = latestNav(page);
        return {
          symbol: page.symbol,
          title: fund.title,
          name: page.name,
          amcName: page.amcName,
          nav: latest.nav,
          changePercent: latest.changePercent,
          currency: page.currency,
          asOfDate: latest.date,
        };
      } catch {
        return null;
      }
    }),
  );

  const items = results.filter((item): item is FundPreviewItem => item != null);
  if (items.length === 0) {
    throw new FundDataError("ไม่พบข้อมูลกองทุนสำหรับ preview", 502);
  }
  return items;
}

export async function fetchFundQuote(symbol: string): Promise<StockQuote> {
  const page = await fetchFundPage(symbol);
  const latest = latestNav(page);
  return {
    symbol: page.symbol,
    name: page.name,
    price: latest.nav,
    change:
      page.quotes.length >= 2
        ? latest.nav - (page.quotes[page.quotes.length - 2]?.navPerUnit ?? latest.nav)
        : 0,
    changePercent: latest.changePercent,
    currency: page.currency,
    marketState: "CLOSED",
    updatedAt: new Date().toISOString(),
  };
}

/**
 * กองทุนมีแค่ NAV รายวัน ไม่มี OHLC จริง
 * ใช้ช่วง NAV ย้อนหลังสั้นๆ เป็น High/Low และ NAV วันก่อนเป็น Close
 */
export async function fetchFundLevels(symbol: string): Promise<SupportResistanceLevels> {
  const page = await fetchFundPage(symbol);
  if (page.quotes.length < 2) {
    throw new FundDataError(`ประวัติ NAV ของ ${symbol} ไม่เพียงพอ`, 502);
  }

  const history = page.quotes.slice(0, -1);
  const window = history.slice(-FUND_LOOKBACK_DAYS);
  if (window.length === 0) {
    throw new FundDataError(`ประวัติ NAV ของ ${symbol} ไม่เพียงพอ`, 502);
  }

  const values = window.map((q) => q.navPerUnit!);
  const close = values[values.length - 1]!;
  const high = Math.max(...values);
  const low = Math.min(...values);
  const date = toDateKey(window[window.length - 1]?.date);

  const priorDay = { open: close, high, low, close, date };

  return {
    symbol: page.symbol,
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
  const page = await fetchFundPage(symbol);
  const start = rangeStartDate(range, new Date());

  const points: ChartPoint[] = [];
  for (const q of page.quotes) {
    if (typeof q.navPerUnit !== "number" || !q.date) continue;
    const dateKey = toDateKey(q.date);
    if (start && new Date(dateKey) < start) continue;
    points.push({ time: dateKey, value: q.navPerUnit });
  }

  if (points.length === 0) {
    throw new FundDataError(`ไม่พบกราฟ NAV ของ ${symbol}`, 404);
  }

  return {
    symbol: page.symbol,
    range,
    currency: page.currency,
    points,
  };
}
