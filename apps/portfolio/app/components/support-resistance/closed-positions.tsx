'use client';

import type { ClosedPositionItem, ClosedPositionsSummary } from '@/lib/stocks/types';

import { StockLogo } from './stock-logo';

type ClosedPositionsProps = {
  items: ClosedPositionItem[];
  summary: ClosedPositionsSummary;
};

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatShares(shares: number) {
  return shares.toLocaleString('en-US', {
    maximumFractionDigits: 4,
  });
}

function formatSignedPercent(value: number) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function toneClass(up: boolean) {
  return up ? 'text-emerald-700' : 'text-rose-600';
}

function Metric({
  label,
  value,
  tone,
  surface = 'emerald',
}: {
  label: string;
  value: string;
  tone?: 'up' | 'down' | 'neutral';
  surface?: 'emerald' | 'rose' | 'auto';
}) {
  const resolvedSurface =
    surface === 'auto'
      ? tone === 'down'
        ? 'rose'
        : tone === 'up'
          ? 'emerald'
          : 'emerald'
      : surface;
  const isRose = resolvedSurface === 'rose';

  return (
    <div
      className={`min-w-0 rounded-xl px-3 py-2.5 ${
        isRose ? 'bg-rose-50' : 'bg-emerald-50/80'
      }`}
    >
      <p
        className={`text-[11px] leading-none ${
          isRose ? 'text-rose-800/55' : 'text-emerald-800/55'
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1.5 truncate text-sm font-semibold tabular-nums ${
          tone === 'up'
            ? 'text-emerald-700'
            : tone === 'down'
              ? 'text-rose-600'
              : isRose
                ? 'text-rose-900'
                : 'text-stone-900'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function ClosedPositions({ items, summary }: ClosedPositionsProps) {
  if (items.length === 0) return null;

  const pnlUp = summary.totalRealizedPnl >= 0;
  const sorted = [...items].sort((a, b) => b.realizedPnl - a.realizedPnl);

  return (
    <section className="border-border rounded-2xl border bg-white px-3 py-4 sm:px-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-900">ขายแล้ว</p>
          <p className="mt-0.5 text-xs text-stone-500">{items.length} รายการ</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[11px] text-stone-500">กำไรรับรู้</p>
          <p className={`text-sm font-semibold tabular-nums ${toneClass(pnlUp)}`}>
            {pnlUp ? '+' : ''}
            {formatPrice(summary.totalRealizedPnl, summary.currency)}
          </p>
          <p className={`text-xs tabular-nums ${toneClass(pnlUp)}`}>
            {pnlUp ? '+' : ''}
            {summary.totalRealizedPnlPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {sorted.map((item) => {
          const up = item.realizedPnl >= 0;
          const sinceSell = item.priceSinceSellPercent;
          const sinceSellTone =
            sinceSell == null ? 'neutral' : sinceSell >= 0 ? 'up' : 'down';

          return (
            <li
              key={item.symbol}
              className="rounded-2xl border border-stone-100 bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <StockLogo symbol={item.symbol} size={28} />
                  <div className="min-w-0">
                    <p className="font-mono text-base font-semibold text-stone-900">
                      {item.symbol}
                    </p>
                    <p className="text-xs text-stone-500">
                      {formatShares(item.shares)} หุ้น
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className={`text-base font-semibold tabular-nums ${toneClass(up)}`}>
                    {up ? '+' : ''}
                    {formatPrice(item.realizedPnl, item.currency)}
                  </p>
                  <p className={`text-xs tabular-nums ${toneClass(up)}`}>
                    {up ? '+' : ''}
                    {item.realizedPnlPercent.toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Metric
                  label="ซื้อ"
                  value={formatPrice(item.avgBuyPrice, item.currency)}
                />
                <Metric
                  label="ขาย"
                  value={formatPrice(item.sellPrice, item.currency)}
                />
                <Metric
                  label="ปัจจุบัน"
                  value={
                    item.currentPrice != null
                      ? formatPrice(item.currentPrice, item.currency)
                      : '—'
                  }
                />
                <Metric
                  label="จากราคาขาย"
                  value={sinceSell != null ? formatSignedPercent(sinceSell) : '—'}
                  tone={sinceSellTone}
                  surface="auto"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
