"use client";

import { marketStateLabel } from "@/lib/stocks/labels";
import type { StockQuote } from "@/lib/stocks/types";

type QuoteStripProps = {
  quote: StockQuote | null;
  loading: boolean;
  polling: boolean;
  error: string | null;
};

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export function QuoteStrip({
  quote,
  loading,
  polling,
  error,
}: QuoteStripProps) {
  if (error && !quote) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="rounded-2xl border border-border bg-white px-4 py-6 text-sm text-stone-500">
        {loading ? "กำลังโหลดราคา…" : "เลือกตัวย่อหุ้น"}
      </div>
    );
  }

  const up = quote.change >= 0;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border bg-white px-4 py-4">
      <div>
        <p className="text-xs tracking-wide text-stone-500">
          <span className="font-mono uppercase">{quote.symbol}</span>
          {" · "}
          {marketStateLabel(quote.marketState)}
        </p>
        <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-stone-900">
          {formatPrice(quote.price, quote.currency)}
        </p>
        <p
          className={`mt-1 font-mono text-sm ${up ? "text-emerald-700" : "text-rose-600"}`}
        >
          {up ? "+" : ""}
          {quote.change.toFixed(2)} ({up ? "+" : ""}
          {quote.changePercent.toFixed(2)}%)
        </p>
      </div>

      <div className="flex flex-col items-end gap-1 text-right text-xs text-stone-500">
        <span className="inline-flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              polling ? "animate-pulse bg-emerald-500" : "bg-stone-300"
            }`}
          />
          {polling ? "สด · อัปเดตทุก 15 วินาที" : "หยุดชั่วคราว"}
        </span>
        <span>อัปเดตล่าสุด {formatTime(quote.updatedAt)}</span>
        {error ? <span className="text-amber-600">{error}</span> : null}
      </div>
    </div>
  );
}
