export const SEED_FUNDS = [
  {
    symbol: "MEGA10CHINATECH-A",
    title: "MEGA10 China Tech",
    projId: "M0803_2568",
    fundClassName: "MEGA10CHINATECH-A",
    name: "MEGA 10 CHINA TECHNOLOGY FUND",
    amcName: "TALIS ASSET MANAGEMENT COMPANY LIMITED",
  },
  {
    symbol: "MEGA10CHINA-A",
    title: "MEGA10 China",
    projId: "M0682_2566",
    fundClassName: "MEGA10CHINA-A",
    name: "MEGA 10 CHINA FUND",
    amcName: "TALIS ASSET MANAGEMENT COMPANY LIMITED",
  },
  {
    symbol: "A-JEDI",
    title: "A-JEDI",
    projId: "M0008_2569",
    fundClassName: "main",
    name: "Atrackers Space Innovators Fund",
    amcName: "ASSET PLUS FUND MANAGEMENT COMPANY LIMITED",
  },
  {
    symbol: "ES-GRID",
    title: "ES-GRID",
    projId: "M0288_2569",
    fundClassName: "main",
    name: "Eastspring Smart Grid Infrastructure Fund",
    amcName: "EASTSPRING ASSET MANAGEMENT (THAILAND) COMPANY LIMITED",
  },
] as const;

export type SeedFundSymbol = (typeof SEED_FUNDS)[number]["symbol"];

export type SeedFund = (typeof SEED_FUNDS)[number];

export function getSeedFund(symbol: string): SeedFund | undefined {
  return SEED_FUNDS.find((f) => f.symbol === symbol);
}

export function isSeedFundSymbol(symbol: string): symbol is SeedFundSymbol {
  return SEED_FUNDS.some((f) => f.symbol === symbol);
}
