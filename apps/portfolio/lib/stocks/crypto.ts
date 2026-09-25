/** Yahoo crypto pairs like BTC-USD, ETH-USD (not forex *=X). */
export function isCryptoSymbol(symbol: string): boolean {
  return /^[A-Z0-9]{2,10}-USD$/i.test(symbol.trim());
}

/** BTC-USD → BTC */
export function cryptoDisplaySymbol(symbol: string): string {
  const upper = symbol.trim().toUpperCase();
  if (upper.endsWith('-USD')) return upper.slice(0, -4);
  return upper;
}
