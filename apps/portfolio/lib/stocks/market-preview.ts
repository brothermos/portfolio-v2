import type { MarketPreviewFooter } from "./types";

export type MarketPreviewConfig = {
  id: string;
  symbol: string;
  title: string;
  flag: "us" | "th" | "us-th";
  footer: MarketPreviewFooter;
};

/** รายการ preview ที่ Yahoo Finance รองรับจริง */
export const MARKET_PREVIEW_ITEMS: MarketPreviewConfig[] = [
  {
    id: "spy",
    symbol: "SPY",
    title: "S&P500 ETF",
    flag: "us",
    footer: "symbol",
  },
  {
    id: "qqqm",
    symbol: "QQQM",
    title: "NDQ100 ETF",
    flag: "us",
    footer: "symbol",
  },
  {
    id: "usdthb",
    symbol: "USDTHB=X",
    title: "USD → THB",
    flag: "th",
    footer: "fx",
  },
];
