export const SEED_WATCHLIST = [
  'INTC',
  'STRL',
  'RKLB',
  'AMD',
  'ARM',
  'PLTR',
  'TSM',
  'ABBV',
  'AAPL',
  'SE',
  'OUST',
  'SONY',
  'META',
  'TMDX',
  'PRCT',
  'TSLA',
  'COST',
  'IREN',
  'RBLX',
  'PFE',
  'NFLX',
  'GRAB',
  'CRM',
  'ON',
  'ONDS',
  'QUBT',
  'DUOL',
  'SKYE',
  'CRWV',
  'PEP',
  'ORCL',
  'VPG',
  'SPCX',
] as const;

export type SeedSymbol = (typeof SEED_WATCHLIST)[number];

export type SeedHolding = {
  quantity: number;
  avgBuyPrice: number;
};

export type SeedClosedPosition = {
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  sellPrice: number;
};

/** Hardcoded holdings — edit when positions change. */
export const SEED_HOLDINGS: Record<SeedSymbol, SeedHolding> = {
  INTC: { quantity: 1.0843239, avgBuyPrice: 26.5972 },
  STRL: { quantity: 0.3150779, avgBuyPrice: 186.8427 },
  RKLB: { quantity: 1.3027702, avgBuyPrice: 22.598 },
  AMD: { quantity: 1.4179546, avgBuyPrice: 163.1999 },
  ARM: { quantity: 0.9049553, avgBuyPrice: 145.3884 },
  PLTR: { quantity: 0.4269666, avgBuyPrice: 70.146 },
  TSM: { quantity: 0.2069965, avgBuyPrice: 241.55 },
  ABBV: { quantity: 0.1684962, avgBuyPrice: 174.722 },
  AAPL: { quantity: 0.8616279, avgBuyPrice: 231.7474 },
  SE: { quantity: 1.5257621, avgBuyPrice: 85.1312 },
  OUST: { quantity: 8.1535587, avgBuyPrice: 36.3455 },
  SONY: { quantity: 7.0197503, avgBuyPrice: 18.5747 },
  META: { quantity: 0.6377621, avgBuyPrice: 576.0926 },
  TMDX: { quantity: 0.4226172, avgBuyPrice: 70.442 },
  PRCT: { quantity: 1.4897551, avgBuyPrice: 20.01 },
  TSLA: { quantity: 0.0880991, avgBuyPrice: 438.3698 },
  COST: { quantity: 0.0298357, avgBuyPrice: 1000.832 },
  IREN: { quantity: 1.9198992, avgBuyPrice: 46.9608 },
  RBLX: { quantity: 1.0039296, avgBuyPrice: 63.62 },
  PFE: { quantity: 3.1552188, avgBuyPrice: 28.4037 },
  NFLX: { quantity: 4.6774549, avgBuyPrice: 96.2703 },
  GRAB: { quantity: 34.197434, avgBuyPrice: 5.4192 },
  CRM: { quantity: 0.1830046, avgBuyPrice: 272.78 },
  ON: { quantity: 2.2261138, avgBuyPrice: 79.5753 },
  ONDS: { quantity: 10.5968339, avgBuyPrice: 8.4954 },
  QUBT: { quantity: 3.1094527, avgBuyPrice: 16.08 },
  DUOL: { quantity: 0.6427121, avgBuyPrice: 318.5874 },
  SKYE: { quantity: 15, avgBuyPrice: 1.855 },
  CRWV: { quantity: 0.2842694, avgBuyPrice: 107.574 },
  PEP: { quantity: 0.0082812, avgBuyPrice: 171.472 },
  ORCL: { quantity: 0.424794, avgBuyPrice: 140.986 },
  VPG: { quantity: 5.20232859, avgBuyPrice: 77.8069 },
  SPCX: { quantity: 1, avgBuyPrice: 114.61 },
};

/** Fully closed positions — edit when realizing sales. */
export const SEED_CLOSED_POSITIONS: SeedClosedPosition[] = [
  {
    symbol: 'MSFT',
    quantity: 0.4721259,
    avgBuyPrice: 422.938,
    sellPrice: 487.65,
  },
  {
    symbol: 'AMZN',
    quantity: 2.0931712,
    avgBuyPrice: 221.5156,
    sellPrice: 284.7801,
  },
  {
    symbol: 'NVDA',
    quantity: 5.7003013,
    avgBuyPrice: 150.1728,
    sellPrice: 206.96,
  },
  {
    symbol: 'GOOG',
    quantity: 2.0868389,
    avgBuyPrice: 200.9019,
    sellPrice: 375.0102,
  },
];

export function normalizeSymbol(raw: string): string {
  return raw.trim().toUpperCase();
}

export function isValidSymbol(symbol: string): boolean {
  return /^[A-Z][A-Z0-9.\-]{0,9}$/.test(symbol);
}
