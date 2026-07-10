export function getTickerLogoUrl(
  symbol: string,
  size = 64,
): string | null {
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY;
  if (!token) return null;

  const ticker = symbol.trim().toUpperCase();
  if (!ticker) return null;

  const params = new URLSearchParams({
    token,
    size: String(size),
  });

  return `https://img.logo.dev/ticker/${encodeURIComponent(ticker)}?${params.toString()}`;
}
