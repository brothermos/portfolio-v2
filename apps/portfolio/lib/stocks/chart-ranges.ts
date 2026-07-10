import type { ChartRangeId } from "./types";

export type YahooChartInterval =
  | "1m"
  | "2m"
  | "5m"
  | "15m"
  | "30m"
  | "60m"
  | "1d"
  | "1wk"
  | "1mo";

export type ChartRangeConfig = {
  id: ChartRangeId;
  label: string;
  interval: YahooChartInterval;
  /** true = ใช้ YYYY-MM-DD บนแกนเวลา */
  dailyScale: boolean;
  period1: (now: Date) => Date;
};

export const CHART_RANGES: ChartRangeConfig[] = [
  {
    id: "1D",
    label: "1 วัน",
    interval: "5m",
    dailyScale: false,
    period1: (now) => {
      const d = new Date(now);
      d.setUTCDate(d.getUTCDate() - 1);
      return d;
    },
  },
  {
    id: "5D",
    label: "5 วัน",
    interval: "15m",
    dailyScale: false,
    period1: (now) => {
      const d = new Date(now);
      d.setUTCDate(d.getUTCDate() - 5);
      return d;
    },
  },
  {
    id: "1M",
    label: "1 เดือน",
    interval: "1d",
    dailyScale: true,
    period1: (now) => {
      const d = new Date(now);
      d.setUTCMonth(d.getUTCMonth() - 1);
      return d;
    },
  },
  {
    id: "6M",
    label: "6 เดือน",
    interval: "1d",
    dailyScale: true,
    period1: (now) => {
      const d = new Date(now);
      d.setUTCMonth(d.getUTCMonth() - 6);
      return d;
    },
  },
  {
    id: "YTD",
    label: "YTD",
    interval: "1d",
    dailyScale: true,
    period1: (now) => new Date(Date.UTC(now.getUTCFullYear(), 0, 1)),
  },
  {
    id: "1Y",
    label: "1 ปี",
    interval: "1d",
    dailyScale: true,
    period1: (now) => {
      const d = new Date(now);
      d.setUTCFullYear(d.getUTCFullYear() - 1);
      return d;
    },
  },
  {
    id: "5Y",
    label: "5 ปี",
    interval: "1wk",
    dailyScale: true,
    period1: (now) => {
      const d = new Date(now);
      d.setUTCFullYear(d.getUTCFullYear() - 5);
      return d;
    },
  },
  {
    id: "MAX",
    label: "สูงสุด",
    interval: "1mo",
    dailyScale: true,
    period1: () => new Date(Date.UTC(1970, 0, 1)),
  },
];

export function getChartRange(id: string | null): ChartRangeConfig {
  const found = CHART_RANGES.find((r) => r.id === id);
  if (!found) {
    return CHART_RANGES[0]!;
  }
  return found;
}

export function isChartRangeId(value: string): value is ChartRangeId {
  return CHART_RANGES.some((r) => r.id === value);
}
