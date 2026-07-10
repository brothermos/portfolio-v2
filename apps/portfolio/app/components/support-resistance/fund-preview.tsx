"use client";

import { useEffect, useState } from "react";

import { appPath } from "@/lib/base-path";
import type { FundPreviewItem } from "@/lib/funds/settrade";
import { SEED_FUNDS } from "@/lib/funds/watchlist";

const POLL_MS = 60_000;

type FundPreviewProps = {
  selectedSymbol: string | null;
  onSelectSymbol: (symbol: string) => void;
};

function formatNav(nav: number) {
  return nav.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

export function FundPreview({ selectedSymbol, onSelectSymbol }: FundPreviewProps) {
  const [items, setItems] = useState<FundPreviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    async function load() {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      try {
        const response = await fetch(appPath("/api/funds/preview"));
        const body = (await response.json()) as {
          items?: FundPreviewItem[];
          error?: string;
        };
        if (!response.ok) {
          throw new Error(body.error ?? `คำขอล้มเหลว (${response.status})`);
        }
        if (!cancelled) {
          const sorted = [...(body.items ?? [])].sort(
            (a, b) => b.changePercent - a.changePercent,
          );
          setItems(sorted);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "โหลดกองทุนไม่สำเร็จ");
        }
      } finally {
        if (!cancelled) setLoading(false);
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
      if (document.visibilityState === "visible") start();
      else if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-medium text-stone-800">กองทุน</h2>
        <p className="text-xs text-stone-500">
          {items.length > 0 ? `${items.length} กอง` : `${SEED_FUNDS.length} กอง`} ·
          คลิกเพื่อดูแนวรับแนวต้าน
        </p>
      </div>

      {error && items.length === 0 ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : loading && items.length === 0 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[100px] w-[160px] shrink-0 animate-pulse rounded-2xl bg-white/70"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto py-2 px-0.5">
          {items.map((item) => {
            const up = item.changePercent >= 0;
            const active = item.symbol === selectedSymbol;
            return (
              <button
                key={item.symbol}
                type="button"
                onClick={() => onSelectSymbol(item.symbol)}
                title={item.name}
                className={`flex min-w-[160px] shrink-0 cursor-pointer flex-col gap-1.5 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-emerald-300 bg-emerald-50 ring-1 ring-emerald-500/30"
                    : "border-border bg-white hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-[9px] leading-none">
                    🇹🇭
                  </span>
                  <span className="truncate text-sm font-semibold text-stone-900">
                    {item.title}
                  </span>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-base font-semibold ${
                    up ? "text-emerald-700" : "text-rose-600"
                  }`}
                >
                  <span aria-hidden>{up ? "↗" : "↘"}</span>
                  <span>
                    {Math.abs(item.changePercent).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </span>
                </span>
                <span className="font-mono text-sm text-stone-600">
                  {formatNav(item.nav)} THB
                </span>
                <span className="truncate text-[10px] text-stone-500">
                  {item.symbol} · {item.asOfDate}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
