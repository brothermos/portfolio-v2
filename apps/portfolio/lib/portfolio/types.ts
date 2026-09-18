export type StockHolding = {
  quantity: number;
  avgBuyPrice: number;
};

export type ClosedPosition = {
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  sellPrice: number;
};

export type CashBalances = {
  THB: number;
  USD: number;
};

export type FundDefinition = {
  symbol: string;
  title: string;
  projId: string;
  fundClassName: string;
  name: string;
  amcName: string;
};

export type FundHolding = {
  units: number;
  avgBuyNav: number;
};

export type PortfolioConfig = {
  version: 1;
  updatedAt: string;
  cash: CashBalances;
  watchlist: string[];
  holdings: Record<string, StockHolding>;
  closedPositions: ClosedPosition[];
  funds: FundDefinition[];
  fundHoldings: Record<string, FundHolding>;
};
