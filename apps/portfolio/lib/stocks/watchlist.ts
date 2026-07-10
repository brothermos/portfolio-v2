export const SEED_WATCHLIST = [
  'INTC',
  'STRL',
  'RKLB',
  'AMD',
  'ARM',
  'GOOG',
  'PLTR',
  'TSM',
  'ABBV',
  'AAPL',
  'NVDA',
  'SE',
  'OUST',
  'SONY',
  'AMZN',
  'META',
  'TMDX',
  'PRCT',
  'TSLA',
  'COST',
  'MSFT',
  'IREN',
  'RBLX',
  'PFE',
  'NFLX',
  'GRAB',
  'CRM',
  'ONDS',
  'QUBT',
  'DUOL',
  'SKYE',
  'CRWV',
  'PEP',
  'ORCL',
] as const;

export type SeedSymbol = (typeof SEED_WATCHLIST)[number];

export function normalizeSymbol(raw: string): string {
  return raw.trim().toUpperCase();
}

export function isValidSymbol(symbol: string): boolean {
  return /^[A-Z][A-Z0-9.\-]{0,9}$/.test(symbol);
}
