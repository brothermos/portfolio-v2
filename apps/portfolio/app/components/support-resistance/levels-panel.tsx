"use client";

import type { LevelKey, PivotLevels, StockQuote, SupportResistanceLevels } from "@/lib/stocks/types";

const LEVEL_ORDER: { key: LevelKey; label: string; kind: "resistance" | "pivot" | "support" }[] = [
  { key: "r3", label: "R3", kind: "resistance" },
  { key: "r2", label: "R2", kind: "resistance" },
  { key: "r1", label: "R1", kind: "resistance" },
  { key: "pivot", label: "Pivot", kind: "pivot" },
  { key: "s1", label: "S1", kind: "support" },
  { key: "s2", label: "S2", kind: "support" },
  { key: "s3", label: "S3", kind: "support" },
];

type LevelsPanelProps = {
  data: SupportResistanceLevels | null;
  quote: StockQuote | null;
  loading: boolean;
  error: string | null;
  assetKind?: "stock" | "fund";
};

function formatLevel(value: number) {
  return value.toFixed(value >= 100 ? 2 : 4);
}

function kindClass(kind: "resistance" | "pivot" | "support") {
  if (kind === "resistance") return "text-rose-600";
  if (kind === "support") return "text-emerald-700";
  return "text-amber-700";
}

export function LevelsPanel({
  data,
  quote,
  loading,
  error,
  assetKind = "stock",
}: LevelsPanelProps) {
  if (error && !data) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-border bg-white px-4 py-8 text-sm text-stone-500">
        {loading ? "กำลังคำนวณระดับ Pivot…" : "ยังไม่มีระดับแนวรับแนวต้าน"}
      </div>
    );
  }

  const price = quote?.price ?? null;
  const levels: PivotLevels = data.levels;

  return (
    <div className="rounded-2xl border border-border bg-white">
      <div className="flex flex-col gap-1 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium text-stone-800">
          {assetKind === "fund"
            ? "ระดับ Pivot จาก NAV ย้อนหลัง"
            : "ระดับ Pivot แบบคลาสสิก"}
        </h2>
        <p className="font-mono text-xs text-stone-500">
          {assetKind === "fund" ? "ช่วงอ้างอิง" : "วันก่อนหน้า"} {data.priorDay.date} · สูง{" "}
          {formatLevel(data.priorDay.high)} / ต่ำ {formatLevel(data.priorDay.low)} / ปิด{" "}
          {formatLevel(data.priorDay.close)}
        </p>
      </div>

      <ul className="divide-y divide-border">
        {LEVEL_ORDER.map(({ key, label, kind }) => {
          const value = levels[key];
          const distance = price != null ? value - price : null;
          const distancePct = price != null && price !== 0 ? (distance! / price) * 100 : null;
          const nearest =
            price != null &&
            Math.abs(distance!) ===
              Math.min(...LEVEL_ORDER.map((row) => Math.abs(levels[row.key] - price)));

          return (
            <li
              key={key}
              className={`grid grid-cols-[4rem_1fr_auto] items-center gap-3 px-4 py-2.5 font-mono text-sm ${
                nearest ? "bg-emerald-50/80" : ""
              }`}
            >
              <span className={`font-semibold ${kindClass(kind)}`}>{label}</span>
              <span className="text-stone-900">{formatLevel(value)}</span>
              <span className="text-right text-xs text-stone-500">
                {distance != null && distancePct != null ? (
                  <>
                    {distance >= 0 ? "+" : ""}
                    {distance.toFixed(2)} ({distancePct >= 0 ? "+" : ""}
                    {distancePct.toFixed(2)}%)
                  </>
                ) : (
                  "—"
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
