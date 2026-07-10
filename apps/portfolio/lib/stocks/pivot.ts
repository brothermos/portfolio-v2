import type { PivotLevels, PriorDayOhlc } from "./types";

/** Classic pivot points from prior-day OHLC. */
export function classicPivotPoints(ohlc: Pick<PriorDayOhlc, "high" | "low" | "close">): PivotLevels {
  const { high: H, low: L, close: C } = ohlc;
  const pivot = (H + L + C) / 3;
  const range = H - L;

  return {
    pivot,
    r1: 2 * pivot - L,
    s1: 2 * pivot - H,
    r2: pivot + range,
    s2: pivot - range,
    r3: H + 2 * (pivot - L),
    s3: L - 2 * (H - pivot),
  };
}
