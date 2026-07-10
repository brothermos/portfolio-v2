"use client";

import { useEffect, useState } from "react";

import { appPath } from "@/lib/base-path";
import type { MarketPreviewItem } from "@/lib/stocks/types";

const POLL_MS = 30_000;

function FlagUs({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-[9px] leading-none ${className ?? ""}`}
      aria-hidden
    >
      🇺🇸
    </span>
  );
}

function FlagTh({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-[9px] leading-none ${className ?? ""}`}
      aria-hidden
    >
      🇹🇭
    </span>
  );
}

function FlagPair() {
  return (
    <span className="relative inline-flex h-5 w-7 items-center" aria-hidden>
      <FlagUs className="absolute left-0 z-10" />
      <FlagTh className="absolute right-0" />
    </span>
  );
}

function formatFooter(item: MarketPreviewItem) {
  if (item.footer === "symbol") return item.symbol;
  if (item.footer === "fx") {
    return `${item.price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} THB`;
  }
  return item.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function isSelectableMarketItem(item: MarketPreviewItem) {
  return item.footer === "symbol";
}

type MarketPreviewProps = {
  selectedSymbol?: string | null;
  onSelectSymbol?: (symbol: string) => void;
  onReady?: () => void;
};

export function MarketPreview({
  selectedSymbol = null,
  onSelectSymbol,
  onReady,
}: MarketPreviewProps) {
  const [items, setItems] = useState<MarketPreviewItem[]>([]);
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
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "hidden"
      ) {
        return;
      }
      try {
        const response = await fetch(appPath("/api/stocks/market-preview"));
        const body = (await response.json()) as {
          items?: MarketPreviewItem[];
          error?: string;
        };
        if (!response.ok) {
          throw new Error(body.error ?? `คำขอล้มเหลว (${response.status})`);
        }
        if (!cancelled) {
          setItems(body.items ?? []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "โหลดตลาดไม่สำเร็จ");
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
  }, [onReady]);

  if (error && items.length === 0) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[92px] w-[160px] shrink-0 animate-pulse rounded-2xl bg-white/70"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 pt-0.5">
      {items.map((item) => {
        const up = item.changePercent >= 0;
        const selectable = isSelectableMarketItem(item) && !!onSelectSymbol;
        const active = selectable && item.symbol === selectedSymbol;
        const className = `flex min-w-[150px] shrink-0 flex-col gap-1.5 rounded-2xl border px-4 py-3 text-left ${
          active
            ? "border-emerald-300 bg-emerald-50 ring-1 ring-emerald-500/30"
            : "border-border bg-white"
        } ${selectable ? "cursor-pointer transition-colors hover:bg-stone-50" : ""}`;

        const content = (
          <>
            <div className="flex items-center gap-2">
              {item.flag === "us" ? (
                <FlagUs />
              ) : item.flag === "th" ? (
                <FlagTh />
              ) : (
                <FlagPair />
              )}
              <span className="text-sm font-semibold text-stone-900">
                {item.title}
              </span>
            </div>

            <div
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
            </div>

            <div className="text-sm text-stone-600">{formatFooter(item)}</div>
          </>
        );

        if (selectable) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSymbol(item.symbol)}
              className={className}
            >
              {content}
            </button>
          );
        }

        return (
          <div key={item.id} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
