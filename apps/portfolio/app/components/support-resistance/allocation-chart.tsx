'use client';

import { useMemo, useState } from 'react';

type AllocationItem = {
  symbol: string;
  currency: string;
  marketValue: number;
  weightPercent: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  shares?: number;
  units?: number;
};

type AllocationSummary = {
  totalMarketValue: number;
  totalUnrealizedPnl: number;
  totalUnrealizedPnlPercent: number;
  currency: string;
};

type AllocationChartProps = {
  items: AllocationItem[];
  summary: AllocationSummary;
  selectedSymbol?: string;
  onSelectSymbol?: (symbol: string) => void;
};

const PALETTE = [
  '#059669',
  '#2563eb',
  '#d97706',
  '#db2777',
  '#7c3aed',
  '#0891b2',
  '#e11d48',
];

const SIZE = 280;
const STROKE = 36;
const RADIUS = (SIZE - STROKE) / 2 - 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function AllocationChart({
  items,
  summary,
  selectedSymbol = '',
  onSelectSymbol,
}: AllocationChartProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const slices = useMemo(() => {
    const holdings = items
      .filter((item) => (item.shares ?? item.units ?? 0) > 0 && item.marketValue > 0)
      .sort((a, b) => b.marketValue - a.marketValue);

    return holdings.map((item, index) => {
      const ratio = item.weightPercent / 100;
      const length = Math.max(ratio * CIRCUMFERENCE, 0.5);
      const offset = holdings.slice(0, index).reduce((sum, previous) => {
        const previousRatio = previous.weightPercent / 100;
        return sum + Math.max(previousRatio * CIRCUMFERENCE, 0.5);
      }, 0);
      return {
        ...item,
        color: PALETTE[index % PALETTE.length]!,
        dasharray: `${length} ${CIRCUMFERENCE - length}`,
        dashoffset: -offset,
      };
    });
  }, [items]);

  if (slices.length === 0) return null;

  const activeSymbol = hovered ?? (selectedSymbol || null);
  const active = slices.find((s) => s.symbol === activeSymbol) ?? null;
  const pnlUp = summary.totalUnrealizedPnl >= 0;

  return (
    <section className="w-full py-1">
      <div className="flex w-full flex-col items-center gap-4">
        <div
          className="relative w-full"
          style={{ maxWidth: SIZE, aspectRatio: '1' }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-full w-full -rotate-90"
            role="img"
            aria-label="สัดส่วนพอร์ตการลงทุน"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#f5f5f4"
              strokeWidth={STROKE}
            />
            {slices.map((slice) => {
              const isActive = activeSymbol === slice.symbol;
              return (
                <circle
                  key={slice.symbol}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={isActive ? STROKE + 6 : STROKE}
                  strokeDasharray={slice.dasharray}
                  strokeDashoffset={slice.dashoffset}
                  strokeLinecap="butt"
                  className="cursor-pointer transition-[stroke-width] duration-150"
                  onMouseEnter={() => setHovered(slice.symbol)}
                  onClick={() => onSelectSymbol?.(slice.symbol)}
                />
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
            {active ? (
              <>
                <p className="font-mono text-sm font-semibold text-stone-900">{active.symbol}</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                  {formatPrice(active.marketValue, active.currency)}
                </p>
                <p className="mt-0.5 text-xs text-stone-500">{active.weightPercent.toFixed(1)}%</p>
                <p
                  className={`mt-1 text-xs font-medium ${
                    active.unrealizedPnl >= 0 ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {active.unrealizedPnl >= 0 ? '+' : ''}
                  {formatPrice(active.unrealizedPnl, active.currency)} (
                  {active.unrealizedPnl >= 0 ? '+' : ''}
                  {active.unrealizedPnlPercent.toFixed(1)}%)
                </p>
              </>
            ) : (
              <>
                <p className="text-xs tracking-wide text-stone-500">มูลค่ารวม</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                  {formatPrice(summary.totalMarketValue, summary.currency)}
                </p>
                <p
                  className={`mt-1 text-xs font-medium ${
                    pnlUp ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {pnlUp ? '+' : ''}
                  {formatPrice(summary.totalUnrealizedPnl, summary.currency)} ({pnlUp ? '+' : ''}
                  {summary.totalUnrealizedPnlPercent.toFixed(2)}%)
                </p>
              </>
            )}
          </div>
        </div>

        <ul className="flex w-full flex-wrap justify-center gap-1.5">
          {slices.map((slice) => {
            const activeChip =
              slice.symbol === selectedSymbol || slice.symbol === hovered;
            return (
              <li key={slice.symbol}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(slice.symbol)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelectSymbol?.(slice.symbol)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    activeChip
                      ? 'border-emerald-300 bg-emerald-50 text-stone-900'
                      : 'border-border bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: slice.color }}
                    aria-hidden
                  />
                  <span className="font-mono font-medium">{slice.symbol}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
