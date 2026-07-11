'use client';

import { marketStateLabel } from '@/lib/stocks/labels';
import type { StockQuote } from '@/lib/stocks/types';

import { StockLogo } from './stock-logo';

type QuoteStripProps = {
  quote: StockQuote | null;
  loading: boolean;
  polling: boolean;
  error: string | null;
};

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(iso));
}

export function QuoteStrip({ quote, loading, polling, error }: QuoteStripProps) {
  if (error && !quote) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="border-border rounded-2xl border bg-white px-4 py-6 text-sm text-stone-500">
        {loading ? 'กำลังโหลดราคา…' : 'เลือกตัวย่อหุ้น'}
      </div>
    );
  }

  const up = quote.change >= 0;

  return (
    <div
      className="border-border flex flex-col gap-4 rounded-2xl border bg-white px-4 py-4 sm:flex-row
        sm:items-end sm:justify-between sm:gap-6"
    >
      <div className="min-w-0 flex-1">
        <div
          className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2
            sm:gap-y-1"
        >
          <span
            className="border-border inline-flex w-fit shrink-0 items-center rounded-full border
              bg-emerald-700 px-3 py-1 font-mono text-sm font-medium text-white uppercase"
          >
            {quote.symbol}
          </span>
          {quote.name ? (
            <span
              className="min-w-0 text-sm leading-snug wrap-break-word text-stone-700 sm:truncate"
            >
              {quote.name}
            </span>
          ) : null}
          <span className="shrink-0 text-xs tracking-wide text-stone-500">
            <span className="hidden sm:inline">· </span>
            {marketStateLabel(quote.marketState)}
          </span>
        </div>
        <p
          className="mt-2 font-mono text-2xl font-semibold tracking-tight text-stone-900 sm:mt-1
            sm:text-3xl"
        >
          {formatPrice(quote.price, quote.currency)}
        </p>
        <p className={`mt-1 font-mono text-sm ${up ? 'text-emerald-700' : 'text-rose-600'}`}>
          {up ? '+' : ''}
          {quote.change.toFixed(2)} ({up ? '+' : ''}
          {quote.changePercent.toFixed(2)}%)
        </p>
      </div>

      <div
        className="flex shrink-0 flex-row items-center justify-between gap-3 text-xs text-stone-500
          sm:flex-col sm:items-end sm:gap-2 sm:text-right"
      >
        <StockLogo symbol={quote.symbol} size={40} />
        <div className="flex flex-col items-end gap-1 sm:items-end">
          <span className="inline-flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                polling ? 'animate-pulse bg-emerald-500' : 'bg-stone-300'
              }`}
            />
            {polling ? 'สด · อัปเดตทุก 15 วินาที' : 'หยุดชั่วคราว'}
          </span>
          <span>อัปเดตล่าสุด {formatTime(quote.updatedAt)}</span>
          {error ? <span className="text-amber-600">{error}</span> : null}
        </div>
      </div>
    </div>
  );
}
