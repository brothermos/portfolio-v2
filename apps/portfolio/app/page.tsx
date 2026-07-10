import { SupportResistanceBoard } from "./components/support-resistance/board";
import { isValidSymbol, normalizeSymbol } from "@/lib/stocks/watchlist";

type HomeProps = {
  searchParams: Promise<{ symbol?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.symbol) ? params.symbol[0] : params.symbol;
  const normalized = raw ? normalizeSymbol(raw) : "";
  const initialSymbol = isValidSymbol(normalized) ? normalized : undefined;

  return (
    <div className="min-h-full bg-page-bg text-stone-900">
      <SupportResistanceBoard initialSymbol={initialSymbol} />
    </div>
  );
}
