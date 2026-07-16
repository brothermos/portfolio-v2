'use client';

import type { FundPortfolioPreviewItem } from '@/lib/funds/sec';

type FundHoldingDetailProps = {
  holding: FundPortfolioPreviewItem | null;
};

function formatPrice(value: number, currency: string, fractionDigits = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function formatUnits(units: number) {
  return units.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

export function FundHoldingDetail({ holding }: FundHoldingDetailProps) {
  if (!holding || holding.units <= 0) {
    return null;
  }

  const pnlUp = holding.unrealizedPnl >= 0;
  const cost = holding.avgBuyNav * holding.units;
  const rows: { label: string; value: string; tone?: 'up' | 'down' }[] = [
    { label: 'หน่วยลงทุนคงเหลือ', value: formatUnits(holding.units) },
    { label: 'NAV ล่าสุด', value: formatPrice(holding.nav, holding.currency, 4) },
    { label: 'ต้นทุนต่อหน่วย', value: formatPrice(holding.avgBuyNav, holding.currency, 4) },
    { label: 'ต้นทุนรวม', value: formatPrice(cost, holding.currency) },
    { label: 'มูลค่าปัจจุบัน', value: formatPrice(holding.marketValue, holding.currency) },
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
        <span
          className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-stone-200
            text-[10px] leading-none"
          aria-hidden
        >
          🇹🇭
        </span>
        <div>
          <p className="text-sm font-medium text-stone-900">
            มูลค่ากองทุนที่ถือ · <span className="font-mono">{holding.symbol}</span>
          </p>
          <p className="text-xs text-stone-500">ข้อมูลต้นทุนและผลตอบแทนของกองทุนนี้</p>
        </div>
      </div>

      <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-3 border-b border-stone-100 py-2 last:border-0
              sm:border-0 sm:py-1"
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
