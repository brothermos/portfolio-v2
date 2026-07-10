"use client";

import type { LevelKey, PivotLevels, StockQuote, SupportResistanceLevels } from "@/lib/stocks/types";

const MARKERS: { key: LevelKey; label: string; tone: string }[] = [
  { key: "r3", label: "R3", tone: "bg-rose-500/70" },
  { key: "r2", label: "R2", tone: "bg-rose-500/55" },
  { key: "r1", label: "R1", tone: "bg-rose-400/45" },
  { key: "pivot", label: "P", tone: "bg-amber-500/60" },
  { key: "s1", label: "S1", tone: "bg-emerald-500/45" },
  { key: "s2", label: "S2", tone: "bg-emerald-600/55" },
  { key: "s3", label: "S3", tone: "bg-emerald-700/70" },
];

type PriceContextProps = {
  data: SupportResistanceLevels | null;
  quote: StockQuote | null;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function PriceContext({ data, quote }: PriceContextProps) {
  if (!data || !quote) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-border bg-white text-sm text-stone-500">
        จะแสดงเมื่อโหลดราคาและระดับแนวรับแนวต้านแล้ว
      </div>
    );
  }

  const levels: PivotLevels = data.levels;
  const values = MARKERS.map((m) => levels[m.key]);
  const min = Math.min(...values, quote.price);
  const max = Math.max(...values, quote.price);
  const span = max - min || 1;

  function topPercent(price: number) {
    return clamp(((max - price) / span) * 100, 0, 100);
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <h2 className="mb-4 text-sm font-medium text-stone-800">ราคาเทียบระดับ</h2>
      <div className="relative mx-auto h-56 w-full max-w-md">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-stone-200" />

        {MARKERS.map(({ key, label, tone }) => {
          const price = levels[key];
          const top = topPercent(price);
          return (
            <div
              key={key}
              className="absolute left-0 right-0 flex items-center"
              style={{ top: `${top}%`, transform: "translateY(-50%)" }}
            >
              <span className="w-14 shrink-0 text-right font-mono text-[10px] text-stone-500">
                {label}
              </span>
              <div className={`mx-2 h-px flex-1 ${tone}`} />
              <span className="w-16 font-mono text-[10px] text-stone-600">{price.toFixed(2)}</span>
            </div>
          );
        })}

        <div
          className="absolute left-0 right-0 z-10 flex items-center"
          style={{ top: `${topPercent(quote.price)}%`, transform: "translateY(-50%)" }}
        >
          <span className="w-14 shrink-0 text-right text-[10px] font-semibold text-sky-700">
            ปัจจุบัน
          </span>
          <div className="mx-2 h-0.5 flex-1 bg-sky-500" />
          <span className="w-16 font-mono text-[10px] font-semibold text-sky-700">
            {quote.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
