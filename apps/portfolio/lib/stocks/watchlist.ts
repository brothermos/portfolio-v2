export const SEED_WATCHLIST = [
  "INTC",
  "STRL",
  "RKLB",
  "AMD",
  "ARM",
  "GOOG",
  "PLTR",
  "TSM",
  "ABBV",
  "AAPL",
  "NVDA",
  "SE",
  "OUST",
  "SONY",
  "AMZN",
  "META",
  "TMDX",
  "PRCT",
  "TSLA",
  "COST",
  "MSFT",
  "IREN",
  "RBLX",
  "PFE",
  "NFLX",
  "GRAB",
  "CRM",
  "ONDS",
  "QUBT",
  "DUOL",
  "SKYE",
  "CRWV",
  "PEP",
  "ORCL",
  "VPG",
] as const;

export type SeedSymbol = (typeof SEED_WATCHLIST)[number];

export type SeedHolding = {
  quantity: number;
  avgBuyPrice: number;
};

/** Hardcoded holdings — edit when positions change. */
export const SEED_HOLDINGS: Record<SeedSymbol, SeedHolding> = {
  INTC: { quantity: 1.0843239, avgBuyPrice: 26.5972 },
  STRL: { quantity: 0.3150779, avgBuyPrice: 186.8427 },
  RKLB: { quantity: 1.3027702, avgBuyPrice: 22.598 },
  AMD: { quantity: 1.4179546, avgBuyPrice: 163.1999 },
  ARM: { quantity: 0.9049553, avgBuyPrice: 145.3884 },
  GOOG: { quantity: 1.9035951, avgBuyPrice: 189.3155 },
  PLTR: { quantity: 0.4269666, avgBuyPrice: 70.146 },
  TSM: { quantity: 0.2069965, avgBuyPrice: 241.55 },
  ABBV: { quantity: 0.1684962, avgBuyPrice: 174.722 },
  AAPL: { quantity: 0.8616279, avgBuyPrice: 231.7474 },
  NVDA: { quantity: 5.7003013, avgBuyPrice: 150.1728 },
  SE: { quantity: 1.5257621, avgBuyPrice: 85.1312 },
  OUST: { quantity: 1.4513735, avgBuyPrice: 40.9819 },
  SONY: { quantity: 7.0197503, avgBuyPrice: 18.5747 },
  AMZN: { quantity: 2.0931712, avgBuyPrice: 221.5156 },
  META: { quantity: 0.3571907, avgBuyPrice: 611.6901 },
  TMDX: { quantity: 0.4226172, avgBuyPrice: 70.442 },
  PRCT: { quantity: 1.4897551, avgBuyPrice: 20.01 },
  TSLA: { quantity: 0.0880991, avgBuyPrice: 438.3698 },
  COST: { quantity: 0.0298357, avgBuyPrice: 1000.832 },
  MSFT: { quantity: 0.4721259, avgBuyPrice: 422.938 },
  IREN: { quantity: 1.9198992, avgBuyPrice: 46.9608 },
  RBLX: { quantity: 1.0039296, avgBuyPrice: 63.62 },
  PFE: { quantity: 3.1552188, avgBuyPrice: 28.4037 },
  NFLX: { quantity: 4.6774549, avgBuyPrice: 96.2703 },
  GRAB: { quantity: 34.197434, avgBuyPrice: 5.4192 },
  CRM: { quantity: 0.1830046, avgBuyPrice: 272.78 },
  ONDS: { quantity: 10.5968339, avgBuyPrice: 8.4954 },
  QUBT: { quantity: 3.1094527, avgBuyPrice: 16.08 },
  DUOL: { quantity: 0.6427121, avgBuyPrice: 318.5874 },
  SKYE: { quantity: 15, avgBuyPrice: 1.855 },
  CRWV: { quantity: 0.2842694, avgBuyPrice: 107.574 },
  PEP: { quantity: 0.0082812, avgBuyPrice: 171.472 },
  ORCL: { quantity: 0.424794, avgBuyPrice: 140.986 },
  VPG: { quantity: 0.2847889, avgBuyPrice: 104.358 },
};

export function normalizeSymbol(raw: string): string {
  return raw.trim().toUpperCase();
}

export function isValidSymbol(symbol: string): boolean {
  return /^[A-Z][A-Z0-9.\-]{0,9}$/.test(symbol);
}
