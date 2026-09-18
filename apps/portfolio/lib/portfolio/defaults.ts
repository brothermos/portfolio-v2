import {
  SEED_FUND_HOLDINGS,
  SEED_FUNDS,
  type SeedFund,
  type SeedFundHolding,
} from '@/lib/funds/watchlist';
import {
  SEED_CASH,
  SEED_CLOSED_POSITIONS,
  SEED_HOLDINGS,
  SEED_WATCHLIST,
  type SeedClosedPosition,
  type SeedHolding,
} from '@/lib/stocks/watchlist';

import type {
  CashBalances,
  ClosedPosition,
  FundDefinition,
  FundHolding,
  PortfolioConfig,
  StockHolding,
} from './types';

function cloneHolding(holding: SeedHolding): StockHolding {
  return { quantity: holding.quantity, avgBuyPrice: holding.avgBuyPrice };
}

function cloneClosed(position: SeedClosedPosition): ClosedPosition {
  return {
    symbol: position.symbol,
    quantity: position.quantity,
    avgBuyPrice: position.avgBuyPrice,
    sellPrice: position.sellPrice,
  };
}

function cloneFund(fund: SeedFund): FundDefinition {
  return {
    symbol: fund.symbol,
    title: fund.title,
    projId: fund.projId,
    fundClassName: fund.fundClassName,
    name: fund.name,
    amcName: fund.amcName,
  };
}

function cloneFundHolding(holding: SeedFundHolding): FundHolding {
  return { units: holding.units, avgBuyNav: holding.avgBuyNav };
}

export function buildDefaultPortfolioConfig(): PortfolioConfig {
  const holdings: Record<string, StockHolding> = {};
  for (const symbol of SEED_WATCHLIST) {
    holdings[symbol] = cloneHolding(SEED_HOLDINGS[symbol]);
  }

  const fundHoldings: Record<string, FundHolding> = {};
  for (const fund of SEED_FUNDS) {
    fundHoldings[fund.symbol] = cloneFundHolding(SEED_FUND_HOLDINGS[fund.symbol]);
  }

  return {
    version: 1,
    updatedAt: new Date(0).toISOString(),
    cash: { THB: SEED_CASH.THB, USD: SEED_CASH.USD } satisfies CashBalances,
    watchlist: [...SEED_WATCHLIST],
    holdings,
    closedPositions: SEED_CLOSED_POSITIONS.map(cloneClosed),
    funds: SEED_FUNDS.map(cloneFund),
    fundHoldings,
  };
}
