'use client';

import { useEffect, useState } from 'react';

import { appPath } from '@/lib/base-path';
import type { FundPortfolioPreviewItem, FundPortfolioSummary } from '@/lib/funds/sec';
import { SEED_FUNDS } from '@/lib/funds/watchlist';

import { AllocationChart } from './allocation-chart';

const POLL_MS = 60_000;

type FundPreviewProps = {
  selectedSymbol: string | null;
  onSelectSymbol: (symbol: string) => void;
  onReady?: () => void;
  onItemsChange?: (items: FundPortfolioPreviewItem[]) => void;
};

function formatNav(nav: number) {
  return nav.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function FundPreview({
  selectedSymbol,
  onSelectSymbol,
  onReady,
  onItemsChange,
}: FundPreviewProps) {
  const [items, setItems] = useState<FundPortfolioPreviewItem[]>([]);
  const [summary, setSummary] = useState<FundPortfolioSummary | null>(null);
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
        const response = await fetch(appPath('/api/funds/preview'));
        const body = (await response.json()) as {
          items?: FundPortfolioPreviewItem[];
          summary?: FundPortfolioSummary;
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
          setError(err instanceof Error ? err.message : 'โหลดกองทุนไม่สำเร็จ');
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

  const holdingsReady = !loading && items.some((item) => item.units > 0) && summary;

  const cardButtons =
    error && items.length === 0 ? null : loading && items.length === 0 ? null : (
      <>
        {items.map((item) => {
          const up = item.changePercent >= 0;
          const pnlUp = item.unrealizedPnl >= 0;
          const active = item.symbol === selectedSymbol;
          const hasHolding = item.units > 0;
          return (
            <button
              key={item.symbol}
              type="button"
              onClick={() => onSelectSymbol(item.symbol)}
              title={item.name}
              className={`flex h-full min-h-[140px] min-w-0 cursor-pointer flex-col
                justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
                  active
                    ? 'border-emerald-300 bg-emerald-50 ring-1 ring-emerald-500/30'
                    : 'border-border bg-white hover:bg-stone-50'
                }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden
                      rounded-full bg-stone-200 text-[9px] leading-none"
                  >
                    🇹🇭
                  </span>
                  <span className="truncate text-sm font-semibold text-stone-900">{item.title}</span>
                </div>
                {hasHolding ? (
                  <span className="shrink-0 rounded-md bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] text-stone-600">
                    {item.weightPercent.toFixed(0)}%
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1">
                <span
                  className={`flex items-center gap-1.5 text-xl font-semibold tracking-tight ${
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
                <span className="font-mono text-sm text-stone-600">{formatNav(item.nav)} THB</span>
              </div>

              {hasHolding ? (
                <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1 border-t border-stone-100 pt-3">
                  <div>
                    <p className="text-[10px] text-stone-500">มูลค่า</p>
                    <p className="font-mono text-xs font-medium text-stone-800">
                      {formatMoney(item.marketValue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-stone-500">{pnlUp ? 'กำไร' : 'ขาดทุน'}</p>
                    <p
                      className={`font-mono text-xs font-medium ${
                        pnlUp ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {pnlUp ? '+' : ''}
                      {formatMoney(item.unrealizedPnl)}
                    </p>
                  </div>
                </div>
              ) : null}
            </button>
          );
        })}
      </>
    );

  const cardsAlone =
    error && items.length === 0 ? (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    ) : loading && items.length === 0 ? (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[120px] animate-pulse rounded-2xl bg-white/70" />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3">{cardButtons}</div>
    );

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <h2
          className="border-border inline-flex items-center rounded-full border bg-emerald-700 px-3
            py-1 text-sm font-medium text-white"
        >
          กองทุน
        </h2>
        <p className="text-xs text-stone-500">
          {items.length > 0 ? `${items.length} กอง` : `${SEED_FUNDS.length} กอง`}
        </p>
      </div>

      {holdingsReady ? (
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)]">
          <AllocationChart
            items={items}
            summary={summary}
            selectedSymbol={selectedSymbol ?? ''}
            onSelectSymbol={onSelectSymbol}
          />
          <div className="grid h-full grid-cols-2 gap-3 lg:auto-rows-fr">
            {error && items.length === 0 ? (
              <div
                className="col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3
                  text-sm text-rose-700"
              >
                {error}
              </div>
            ) : (
              cardButtons
            )}
          </div>
        </div>
      ) : (
        cardsAlone
      )}
    </section>
  );
}
