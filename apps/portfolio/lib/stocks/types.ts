export type StockQuote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  marketState: string;
  updatedAt: string;
};

export type PriorDayOhlc = {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
};

export type PivotLevels = {
  r3: number;
  r2: number;
  r1: number;
  pivot: number;
  s1: number;
  s2: number;
  s3: number;
};

export type SupportResistanceLevels = {
  symbol: string;
  priorDay: PriorDayOhlc;
  levels: PivotLevels;
};

export type LevelKey = keyof PivotLevels;

export type ChartRangeId =
  | "1D"
  | "5D"
  | "1M"
  | "6M"
  | "YTD"
  | "1Y"
  | "5Y"
  | "MAX";

export type ChartPoint = {
  /** Unix seconds (intraday) หรือ YYYY-MM-DD (รายวันขึ้นไป) */
  time: number | string;
  value: number;
};

export type StockChartSeries = {
  symbol: string;
  range: ChartRangeId;
  currency: string;
  points: ChartPoint[];
};

export type StockSearchResult = {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
};

export type MarketPreviewFooter = "symbol" | "price" | "fx";

export type MarketPreviewItem = {
  id: string;
  symbol: string;
  title: string;
  flag: "us" | "th" | "us-th";
  footer: MarketPreviewFooter;
  price: number;
  changePercent: number;
  currency: string;
};

export type PortfolioPreviewItem = {
  symbol: string;
  price: number;
  changePercent: number;
  currency: string;
  shares: number;
  avgBuyPrice: number;
  marketValue: number;
  weightPercent: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
};

export type PortfolioSummary = {
  totalMarketValue: number;
  totalCostBasis: number;
  totalUnrealizedPnl: number;
  totalUnrealizedPnlPercent: number;
  currency: string;
};

export type ClosedPositionItem = {
  symbol: string;
  currency: string;
  shares: number;
  avgBuyPrice: number;
  sellPrice: number;
  currentPrice: number | null;
  priceSinceSellPercent: number | null;
  costBasis: number;
  proceeds: number;
  realizedPnl: number;
  realizedPnlPercent: number;
};

export type ClosedPositionsSummary = {
  totalCostBasis: number;
  totalProceeds: number;
  totalRealizedPnl: number;
  totalRealizedPnlPercent: number;
  currency: string;
};

export type PortfolioPreviewResponse = {
  items: PortfolioPreviewItem[];
  summary: PortfolioSummary;
  closedPositions: ClosedPositionItem[];
  closedSummary: ClosedPositionsSummary;
};
