'use client';

import { cryptoDisplaySymbol } from '@/lib/stocks/crypto';
import type { PortfolioPreviewItem, PortfolioSummary } from '@/lib/stocks/types';

import { AllocationChart } from './allocation-chart';
import { StockLogo } from './stock-logo';

type CryptoPreviewProps = {
  items: PortfolioPreviewItem[];
  summary: PortfolioSummary | null;
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  loading?: boolean;
  error?: string | null;
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatSignedPercent(value: number) {
  return `${Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}

export function CryptoPreview({
  items,
  summary,
  selectedSymbol,
  onSelectSymbol,
  loading = false,
  error = null,
}: CryptoPreviewProps) {
  if (!loading && !error && items.length === 0) {
    return null;
  }

  const holdingsReady = !loading && items.some((item) => item.shares > 0) && summary;

  const cards =
    error && items.length === 0 ? (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    ) : loading && items.length === 0 ? (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-[112px] animate-pulse rounded-2xl bg-white/70" />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3">
        {items.map((item) => {
          const active = item.symbol === selectedSymbol;
          const up = item.changePercent >= 0;
          return (
            <button
              key={item.symbol}
              type="button"
              onClick={() => onSelectSymbol(item.symbol)}
              className={`flex min-w-0 cursor-pointer flex-col gap-1.5 rounded-2xl border px-4 py-3
                text-left transition-colors ${
                  active
                    ? 'border-amber-300 bg-amber-50 ring-1 ring-amber-500/30'
                    : 'border-border bg-white hover:bg-stone-50'
                }`}
            >
              <span className="flex items-center gap-2">
                <StockLogo symbol={item.symbol} size={20} />
                <span className="font-mono text-sm font-semibold text-stone-900">
                  {cryptoDisplaySymbol(item.symbol)}
                </span>
              </span>
              <span
                className={`flex items-center gap-1.5 text-base font-semibold ${
                  up ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                <span aria-hidden>{up ? '↗' : '↘'}</span>
                <span>{formatSignedPercent(item.changePercent)}</span>
              </span>
              <span className="text-sm tabular-nums text-stone-600">
                {formatPrice(item.price, item.currency)}
              </span>
              <span className="text-xs tabular-nums text-stone-500">
                {formatPrice(item.marketValue, item.currency)}
              </span>
              {typeof summary?.usdThbRate === 'number' && summary.usdThbRate > 0 ? (
                <span className="text-xs tabular-nums text-stone-400">
                  {formatPrice(item.marketValue * summary.usdThbRate, 'THB')}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    );

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2
          className="border-border inline-flex items-center rounded-full border bg-amber-700 px-3
            py-1 text-sm font-medium text-white"
        >
          คริปโต
        </h2>
        <p className="text-xs text-stone-500">
          {items.length > 0 ? `${items.length} ตัว` : loading ? 'กำลังโหลด…' : '0 ตัว'}
        </p>
      </div>

      {holdingsReady ? (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)]">
          <AllocationChart
            items={items}
            summary={summary}
            selectedSymbol={selectedSymbol}
            onSelectSymbol={onSelectSymbol}
          />
          {cards}
        </div>
      ) : (
        cards
      )}
    </section>
  );
}
