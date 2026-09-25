'use client';

import type { PortfolioPreviewItem } from '@/lib/stocks/types';
import { cryptoDisplaySymbol, isCryptoSymbol } from '@/lib/stocks/crypto';

import { StockLogo } from './stock-logo';

type HoldingDetailProps = {
  holding: PortfolioPreviewItem | null;
};

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatShares(shares: number, fractionDigits = 4) {
  return shares.toLocaleString('en-US', {
    maximumFractionDigits: fractionDigits,
  });
}

export function HoldingDetail({ holding }: HoldingDetailProps) {
  if (!holding || holding.shares <= 0) {
    return null;
  }

  const pnlUp = holding.unrealizedPnl >= 0;
  const cost = holding.avgBuyPrice * holding.shares;
  const crypto = isCryptoSymbol(holding.symbol);
  const label = crypto ? cryptoDisplaySymbol(holding.symbol) : holding.symbol;

  const rows: { label: string; value: string; tone?: 'up' | 'down' }[] = [
    { label: 'จำนวน', value: formatShares(holding.shares, crypto ? 8 : 4) },
    { label: 'ราคาเฉลี่ย', value: formatPrice(holding.avgBuyPrice, holding.currency) },
    { label: 'ต้นทุน', value: formatPrice(cost, holding.currency) },
    { label: 'มูลค่า', value: formatPrice(holding.marketValue, holding.currency) },
    { label: 'สัดส่วน', value: `${holding.weightPercent.toFixed(1)}%` },
    {
      label: pnlUp ? 'กำไร' : 'ขาดทุน',
      value: `${pnlUp ? '+' : ''}${formatPrice(holding.unrealizedPnl, holding.currency)} (${pnlUp ? '+' : ''}${holding.unrealizedPnlPercent.toFixed(2)}%)`,
      tone: pnlUp ? 'up' : 'down',
    },
  ];

  return (
    <section className="border-border rounded-2xl border bg-white px-4 py-4">
      <div className="mb-3 flex items-center gap-2">
        <StockLogo symbol={holding.symbol} size={22} />
        <div>
          <p className="text-sm font-medium text-stone-900">
            {crypto ? 'มูลค่าคริปโตที่ถือ' : 'มูลค่าหุ้นที่ถือ'} ·{' '}
            <span className="font-mono">{label}</span>
          </p>
          <p className="text-xs text-stone-500">
            {crypto
              ? 'ข้อมูลต้นทุนและผลตอบแทนของคริปโตนี้'
              : 'ข้อมูลต้นทุนและผลตอบแทนของหุ้นนี้'}
          </p>
        </div>
      </div>

      <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-3 border-b border-stone-100 py-2 last:border-0 sm:border-0 sm:py-1"
          >
            <dt className="text-xs text-stone-500">{row.label}</dt>
            <dd
              className={`text-sm font-medium tabular-nums ${
                row.tone === 'up'
                  ? 'text-emerald-700'
                  : row.tone === 'down'
                    ? 'text-rose-600'
                    : 'text-stone-900'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
