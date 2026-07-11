'use client';

import { useEffect, useState } from 'react';

import { appPath } from '@/lib/base-path';
import type { PortfolioPreviewItem, PortfolioSummary } from '@/lib/stocks/types';
import { SEED_WATCHLIST } from '@/lib/stocks/watchlist';

import { AllocationChart } from './allocation-chart';
import { StockLogo } from './stock-logo';
import { SymbolPicker } from './symbol-picker';

const POLL_MS = 30_000;

type PortfolioPreviewProps = {
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  onReady?: () => void;
  onItemsChange?: (items: PortfolioPreviewItem[]) => void;
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function PortfolioPreview({
  selectedSymbol,
  onSelectSymbol,
  onReady,
  onItemsChange,
}: PortfolioPreviewProps) {
  const [items, setItems] = useState<PortfolioPreviewItem[]>([]);
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;
    let signaledReady = false;

    function signalReady() {
      if (signaledReady) return;
      signaledReady = true;
      onReady?.();
    }

    async function load() {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        return;
      }
      try {
        const response = await fetch(appPath('/api/stocks/portfolio-preview'));
        const body = (await response.json()) as {
          items?: PortfolioPreviewItem[];
          summary?: PortfolioSummary;
          error?: string;
        };
        if (!response.ok) {
          throw new Error(body.error ?? `คำขอล้มเหลว (${response.status})`);
        }
        if (!cancelled) {
          const sorted = [...(body.items ?? [])].sort((a, b) => b.changePercent - a.changePercent);
          setItems(sorted);
          setSummary(body.summary ?? null);
          onItemsChange?.(sorted);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'โหลดพอร์ตไม่สำเร็จ');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          signalReady();
        }
      }
    }

    function start() {
      void load();
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        void load();
      }, POLL_MS);
    }

    function onVisibility() {
      if (document.visibilityState === 'visible') start();
      else if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [onReady, onItemsChange]);

  const holdingsReady = !loading && items.some((item) => item.shares > 0) && summary;

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="border-border inline-flex items-center rounded-full border bg-emerald-700 px-3 py-1 text-sm font-medium text-white">
          หุ้นรายตัว
        </h2>
        <p className="text-xs text-stone-500">
          {items.length > 0 ? `${items.length} ตัว` : `${SEED_WATCHLIST.length} ตัว`}
        </p>
      </div>

      <div>
        <SymbolPicker onSymbolChange={onSelectSymbol} />
      </div>

      {holdingsReady ? (
        <AllocationChart
          items={items}
          summary={summary}
          selectedSymbol={selectedSymbol}
          onSelectSymbol={onSelectSymbol}
        />
      ) : null}

      {error && items.length === 0 ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : loading && items.length === 0 ? (
        <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(132px,1fr))] sm:overflow-visible">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="h-[92px] w-[132px] shrink-0 animate-pulse rounded-2xl bg-white/70 sm:w-full"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto py-2 sm:grid sm:w-full sm:grid-cols-[repeat(auto-fill,minmax(132px,1fr))] sm:overflow-visible">
          {items.map((item) => {
            const up = item.changePercent >= 0;
            const active = item.symbol === selectedSymbol;
            return (
              <button
                key={item.symbol}
                type="button"
                onClick={() => onSelectSymbol(item.symbol)}
                className={`flex w-[132px] shrink-0 cursor-pointer flex-col gap-1.5 rounded-2xl border px-4 py-3 text-left transition-colors sm:w-full ${
                  active
                    ? 'border-emerald-300 bg-emerald-50 ring-1 ring-emerald-500/30'
                    : 'border-border bg-white hover:bg-stone-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <StockLogo symbol={item.symbol} size={20} />
                  <span className="font-mono text-sm font-semibold text-stone-900">
                    {item.symbol}
                  </span>
                </span>
                <span
                  className={`flex items-center gap-1.5 text-base font-semibold ${
                    up ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  <span aria-hidden>{up ? '↗' : '↘'}</span>
                  <span>
                    {Math.abs(item.changePercent).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </span>
                </span>
                <span className="text-sm text-stone-600">
                  {formatPrice(item.price, item.currency)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
