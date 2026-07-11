import YahooFinance from "yahoo-finance2";

import { getChartRange, isChartRangeId } from "./chart-ranges";
import { MARKET_PREVIEW_ITEMS } from "./market-preview";
import { classicPivotPoints } from "./pivot";
import type {
  ChartPoint,
  ChartRangeId,
  MarketPreviewItem,
  PortfolioPreviewItem,
  PortfolioPreviewResponse,
  PriorDayOhlc,
  StockChartSeries,
  StockQuote,
  StockSearchResult,
  SupportResistanceLevels,
} from "./types";
import { isValidSymbol, normalizeSymbol, SEED_HOLDINGS, SEED_WATCHLIST } from "./watchlist";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export class StockDataError extends Error {
  constructor(
    message: string,
    readonly status: number = 502,
  ) {
    super(message);
    this.name = "StockDataError";
  }
}

export function parseSymbolParam(raw: string | null): string {
  if (!raw) {
    throw new StockDataError("ไม่ได้ระบุตัวย่อหุ้น", 400);
  }

  const symbol = normalizeSymbol(raw);
  if (!isValidSymbol(symbol)) {
    throw new StockDataError("รูปแบบตัวย่อหุ้นไม่ถูกต้อง", 400);
  }

  return symbol;
}

function requireNumber(
  value: number | null | undefined,
  label: string,
): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new StockDataError(`ไม่พบข้อมูล${label}จากราคาหุ้น`, 502);
  }
  return value;
}

export async function fetchQuote(symbol: string): Promise<StockQuote> {
  try {
    const quote = await yahooFinance.quote(symbol);

    if (!quote || quote.symbol !== symbol) {
      if (
        !quote?.regularMarketPrice &&
        !quote?.postMarketPrice &&
        !quote?.preMarketPrice
      ) {
        throw new StockDataError(`ไม่พบราคาของ ${symbol}`, 404);
      }
    }

    const price =
      quote.regularMarketPrice ??
      quote.postMarketPrice ??
      quote.preMarketPrice ??
      null;

    const name =
      quote.longName?.trim() ||
      quote.shortName?.trim() ||
      quote.displayName?.trim() ||
      quote.symbol ||
      symbol;

    return {
      symbol: quote.symbol ?? symbol,
      name,
      price: requireNumber(price, "ราคา"),
      change: quote.regularMarketChange ?? 0,
      changePercent: quote.regularMarketChangePercent ?? 0,
      currency: quote.currency ?? "USD",
      marketState: quote.marketState ?? "UNKNOWN",
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof StockDataError) throw error;
    const message =
      error instanceof Error ? error.message : "ดึงราคาหุ้นไม่สำเร็จ";
    if (/not found|No data|Invalid/i.test(message)) {
      throw new StockDataError(`ไม่พบราคาของ ${symbol}`, 404);
    }
    throw new StockDataError(message, 502);
  }
}

export async function fetchMarketPreview(): Promise<MarketPreviewItem[]> {
  const symbols = MARKET_PREVIEW_ITEMS.map((item) => item.symbol);

  try {
    const quotes = await yahooFinance.quote(symbols);
    const list = Array.isArray(quotes) ? quotes : [quotes];
    const bySymbol = new Map(
      list.map((q) => [String(q.symbol ?? "").toUpperCase(), q]),
    );

    const items: MarketPreviewItem[] = [];

    for (const config of MARKET_PREVIEW_ITEMS) {
      const quote =
        bySymbol.get(config.symbol.toUpperCase()) ??
        list.find(
          (q) =>
            String(q.symbol ?? "").toUpperCase() ===
            config.symbol.toUpperCase(),
        );

      const price =
        quote?.regularMarketPrice ??
        quote?.postMarketPrice ??
        quote?.preMarketPrice ??
        null;

      if (typeof price !== "number" || Number.isNaN(price)) {
        continue;
      }

      items.push({
        id: config.id,
        symbol: quote?.symbol ?? config.symbol,
        title: config.title,
        flag: config.flag,
        footer: config.footer,
        price,
        changePercent: quote?.regularMarketChangePercent ?? 0,
        currency: quote?.currency ?? "USD",
      });
    }

    if (items.length === 0) {
      throw new StockDataError("ไม่พบข้อมูลตลาดสำหรับ preview", 502);
    }

    return items;
  } catch (error) {
    if (error instanceof StockDataError) throw error;
    const message =
      error instanceof Error ? error.message : "ดึงข้อมูลตลาดไม่สำเร็จ";
    throw new StockDataError(message, 502);
  }
}

export async function fetchPortfolioPreview(): Promise<PortfolioPreviewResponse> {
  const symbols = [...SEED_WATCHLIST];

  try {
    const quotes = await yahooFinance.quote(symbols);
    const list = Array.isArray(quotes) ? quotes : [quotes];
    const bySymbol = new Map(
      list.map((q) => [String(q.symbol ?? "").toUpperCase(), q]),
    );

    const priced: Array<{
      symbol: string;
      price: number;
      changePercent: number;
      currency: string;
      shares: number;
      avgBuyPrice: number;
      marketValue: number;
      costBasis: number;
      unrealizedPnl: number;
      unrealizedPnlPercent: number;
    }> = [];

    for (const symbol of symbols) {
      const quote = bySymbol.get(symbol);
      const price =
        quote?.regularMarketPrice ??
        quote?.postMarketPrice ??
        quote?.preMarketPrice ??
        null;

      if (typeof price !== "number" || Number.isNaN(price)) {
        continue;
      }

      const holding = SEED_HOLDINGS[symbol];
      const shares = holding?.quantity ?? 0;
      const avgBuyPrice = holding?.avgBuyPrice ?? 0;
      const marketValue = price * shares;
      const costBasis = avgBuyPrice * shares;
      const unrealizedPnl = marketValue - costBasis;
      const unrealizedPnlPercent =
        avgBuyPrice > 0 ? ((price - avgBuyPrice) / avgBuyPrice) * 100 : 0;

      priced.push({
        symbol: quote?.symbol ?? symbol,
        price,
        changePercent: quote?.regularMarketChangePercent ?? 0,
        currency: quote?.currency ?? "USD",
        shares,
        avgBuyPrice,
        marketValue,
        costBasis,
        unrealizedPnl,
        unrealizedPnlPercent,
      });
    }

    if (priced.length === 0) {
      throw new StockDataError("ไม่พบข้อมูลพอร์ตสำหรับ preview", 502);
    }

    const totalMarketValue = priced.reduce((sum, item) => sum + item.marketValue, 0);
    const totalCostBasis = priced.reduce((sum, item) => sum + item.costBasis, 0);
    const totalUnrealizedPnl = totalMarketValue - totalCostBasis;
    const totalUnrealizedPnlPercent =
      totalCostBasis > 0 ? (totalUnrealizedPnl / totalCostBasis) * 100 : 0;

    const items: PortfolioPreviewItem[] = priced.map(
      ({ costBasis: _costBasis, ...item }) => ({
        symbol: item.symbol,
        price: item.price,
        changePercent: item.changePercent,
        currency: item.currency,
        shares: item.shares,
        avgBuyPrice: item.avgBuyPrice,
        marketValue: item.marketValue,
        weightPercent: totalMarketValue > 0 ? (item.marketValue / totalMarketValue) * 100 : 0,
        unrealizedPnl: item.unrealizedPnl,
        unrealizedPnlPercent: item.unrealizedPnlPercent,
      }),
    );

    return {
      items,
      summary: {
        totalMarketValue,
        totalCostBasis,
        totalUnrealizedPnl,
        totalUnrealizedPnlPercent,
        currency: priced[0]?.currency ?? "USD",
      },
    };
  } catch (error) {
    if (error instanceof StockDataError) throw error;
    const message =
      error instanceof Error ? error.message : "ดึงข้อมูลพอร์ตไม่สำเร็จ";
    throw new StockDataError(message, 502);
  }
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function fetchSupportResistanceLevels(
  symbol: string,
): Promise<SupportResistanceLevels> {
  try {
    const period2 = new Date();
    const period1 = new Date();
    period1.setUTCDate(period1.getUTCDate() - 14);

    const chart = await yahooFinance.chart(symbol, {
      period1,
      period2,
      interval: "1d",
    });

    const quotes = (chart.quotes ?? []).filter(
      (q) =>
        q &&
        typeof q.high === "number" &&
        typeof q.low === "number" &&
        typeof q.close === "number" &&
        typeof q.open === "number",
    );

    if (quotes.length < 2) {
      throw new StockDataError(`ข้อมูลรายวันของ ${symbol} ไม่เพียงพอ`, 502);
    }

    const last = quotes[quotes.length - 1]!;
    const prior = quotes[quotes.length - 2]!;

    const marketState = chart.meta?.marketState;
    const usePrior =
      marketState === "REGULAR" ||
      (last.date instanceof Date &&
        toIsoDate(last.date) === toIsoDate(new Date()));

    const bar = usePrior ? prior : last;

    const priorDay: PriorDayOhlc = {
      open: bar.open!,
      high: bar.high!,
      low: bar.low!,
      close: bar.close!,
      date: bar.date instanceof Date ? toIsoDate(bar.date) : String(bar.date),
    };

    return {
      symbol: chart.meta?.symbol ?? symbol,
      priorDay,
      levels: classicPivotPoints(priorDay),
    };
  } catch (error) {
    if (error instanceof StockDataError) throw error;
    const message =
      error instanceof Error ? error.message : "ดึงแนวรับแนวต้านไม่สำเร็จ";
    if (/not found|No data|Invalid/i.test(message)) {
      throw new StockDataError(`ไม่พบประวัติราคาของ ${symbol}`, 404);
    }
    throw new StockDataError(message, 502);
  }
}

export function parseRangeParam(raw: string | null): ChartRangeId {
  if (!raw) return "1D";
  const upper = raw.trim().toUpperCase();
  if (!isChartRangeId(upper)) {
    throw new StockDataError("ช่วงเวลากราฟไม่ถูกต้อง", 400);
  }
  return upper;
}

function toChartTime(date: Date, dailyScale: boolean): number | string {
  if (dailyScale) {
    return toIsoDate(date);
  }
  return Math.floor(date.getTime() / 1000);
}

export async function fetchChartSeries(
  symbol: string,
  rangeId: ChartRangeId,
): Promise<StockChartSeries> {
  const range = getChartRange(rangeId);
  const period2 = new Date();
  const period1 = range.period1(period2);

  try {
    const chart = await yahooFinance.chart(symbol, {
      period1,
      period2,
      interval: range.interval,
    });

    const points: ChartPoint[] = [];
    for (const q of chart.quotes ?? []) {
      if (!q?.date || typeof q.close !== "number" || Number.isNaN(q.close)) {
        continue;
      }
      const date = q.date instanceof Date ? q.date : new Date(q.date);
      if (Number.isNaN(date.getTime())) continue;
      points.push({
        time: toChartTime(date, range.dailyScale),
        value: q.close,
      });
    }

    if (points.length === 0) {
      throw new StockDataError(`ไม่พบข้อมูลกราฟของ ${symbol}`, 404);
    }

    return {
      symbol: chart.meta?.symbol ?? symbol,
      range: range.id,
      currency: chart.meta?.currency ?? "USD",
      points,
    };
  } catch (error) {
    if (error instanceof StockDataError) throw error;
    const message =
      error instanceof Error ? error.message : "ดึงข้อมูลกราฟไม่สำเร็จ";
    if (/not found|No data|Invalid/i.test(message)) {
      throw new StockDataError(`ไม่พบข้อมูลกราฟของ ${symbol}`, 404);
    }
    throw new StockDataError(message, 502);
  }
}

const US_EXCHANGES = new Set([
  "NMS",
  "NYQ",
  "NGM",
  "NCM",
  "ASE",
  "PCX",
  "BTS",
  "YHD",
  "NAS",
  "NYS",
]);

export async function searchStocks(query: string): Promise<StockSearchResult[]> {
  const q = query.trim();
  if (q.length < 1) return [];
  if (q.length > 80) {
    throw new StockDataError("คำค้นหายาวเกินไป", 400);
  }

  try {
    const result = await yahooFinance.search(q, {
      quotesCount: 12,
      newsCount: 0,
    });

    const items: StockSearchResult[] = [];
    for (const quote of result.quotes ?? []) {
      if (!("symbol" in quote) || !quote.symbol) continue;

      const quoteType =
        "quoteType" in quote ? String(quote.quoteType ?? "") : "";
      if (quoteType !== "EQUITY" && quoteType !== "ETF") continue;

      const exchange =
        "exchange" in quote ? String(quote.exchange ?? "") : "";
      if (exchange && !US_EXCHANGES.has(exchange)) continue;

      const name =
        ("longname" in quote && quote.longname
          ? String(quote.longname)
          : null) ??
        ("shortname" in quote && quote.shortname
          ? String(quote.shortname)
          : null) ??
        String(quote.symbol);

      const exchDisp =
        ("exchDisp" in quote && quote.exchDisp
          ? String(quote.exchDisp)
          : null) ?? exchange;

      items.push({
        symbol: String(quote.symbol).toUpperCase(),
        name,
        exchange: exchDisp,
        type: quoteType === "ETF" ? "ETF" : "หุ้น",
      });

      if (items.length >= 8) break;
    }

    return items;
  } catch (error) {
    if (error instanceof StockDataError) throw error;
    const message =
      error instanceof Error ? error.message : "ค้นหาหุ้นไม่สำเร็จ";
    throw new StockDataError(message, 502);
  }
}
