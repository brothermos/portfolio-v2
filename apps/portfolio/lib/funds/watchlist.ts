export const SEED_FUNDS = [
  {
    symbol: "MEGA10CHINATECH-A",
    title: "MEGA10 China Tech",
  },
  {
    symbol: "MEGA10CHINA-A",
    title: "MEGA10 China",
  },
  {
    symbol: "A-JEDI",
    title: "A-JEDI",
  },
  {
    symbol: "ES-GRID",
    title: "ES-GRID",
  },
] as const;

export type SeedFundSymbol = (typeof SEED_FUNDS)[number]["symbol"];
