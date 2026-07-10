"use client";

import {
  AreaSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

import { appPath } from "@/lib/base-path";
import { CHART_RANGES } from "@/lib/stocks/chart-ranges";
import type { ChartRangeId, StockChartSeries } from "@/lib/stocks/types";

type PriceChartProps = {
  symbol: string;
  assetKind?: "stock" | "fund";
};

async function readJson<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(body.error ?? `คำขอล้มเหลว (${response.status})`);
  }
  return body;
}

function toSeriesData(points: StockChartSeries["points"]) {
  return points.map((p) => ({
    time: (typeof p.time === "number" ? p.time : p.time) as Time,
    value: p.value,
  }));
}

export function PriceChart({ symbol, assetKind = "stock" }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  const [range, setRange] = useState<ChartRangeId>(
    assetKind === "fund" ? "1M" : "1D",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoverPrice, setHoverPrice] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [changeFromStart, setChangeFromStart] = useState<{
    amount: number;
    percent: number;
  } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#78716c",
        fontFamily: "var(--font-ibm-plex-sans-thai), ui-sans-serif, system-ui, sans-serif",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(231, 224, 212, 0.9)" },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.12, bottom: 0.08 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        horzLine: { visible: false, labelVisible: false },
        vertLine: {
          color: "rgba(120, 113, 108, 0.45)",
          width: 1,
          style: 2,
          labelVisible: false,
        },
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#059669",
      topColor: "rgba(5, 150, 105, 0.28)",
      bottomColor: "rgba(5, 150, 105, 0.02)",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerRadius: 4,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesData.size) {
        setHoverPrice(null);
        setHoverTime(null);
        return;
      }
      const point = param.seriesData.get(series) as { value?: number } | undefined;
      if (point?.value == null) {
        setHoverPrice(null);
        setHoverTime(null);
        return;
      }
      setHoverPrice(point.value);

      if (typeof param.time === "string") {
        setHoverTime(param.time);
      } else if (typeof param.time === "number") {
        setHoverTime(
          new Intl.DateTimeFormat("th-TH", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(param.time * 1000)),
        );
      } else {
        setHoverTime(null);
      }
    });

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setHoverPrice(null);
      setHoverTime(null);
      try {
        const endpoint =
          assetKind === "fund"
            ? appPath("/api/funds/chart")
            : appPath("/api/stocks/chart");
        const data = await readJson<StockChartSeries>(
          await fetch(
            `${endpoint}?symbol=${encodeURIComponent(symbol)}&range=${range}`,
          ),
        );
        if (cancelled || !seriesRef.current || !chartRef.current) return;

        const seriesData = toSeriesData(data.points);
        const first = seriesData[0]?.value;
        const last = seriesData[seriesData.length - 1]?.value;
        const up = first != null && last != null ? last >= first : true;

        seriesRef.current.applyOptions({
          lineColor: up ? "#059669" : "#e11d48",
          topColor: up ? "rgba(5, 150, 105, 0.28)" : "rgba(225, 29, 72, 0.28)",
          bottomColor: up ? "rgba(5, 150, 105, 0.02)" : "rgba(225, 29, 72, 0.02)",
        });
        seriesRef.current.setData(seriesData);
        chartRef.current.timeScale().fitContent();

        if (first != null && last != null && first !== 0) {
          setChangeFromStart({
            amount: last - first,
            percent: ((last - first) / first) * 100,
          });
        } else {
          setChangeFromStart(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "โหลดกราฟไม่สำเร็จ");
          setChangeFromStart(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [symbol, range, assetKind]);

  const displayPrice = hoverPrice;
  const up = (changeFromStart?.amount ?? 0) >= 0;

  return (
    <div className="rounded-2xl border border-border bg-white">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h2 className="text-sm font-medium text-stone-800">
            {assetKind === "fund" ? "กราฟ NAV" : "กราฟราคา"}
          </h2>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            {displayPrice != null ? (
              <span className="font-mono text-lg text-stone-900">
                {displayPrice.toFixed(2)}
              </span>
            ) : changeFromStart ? (
              <span className={`font-mono text-sm ${up ? "text-emerald-700" : "text-rose-600"}`}>
                {up ? "+" : ""}
                {changeFromStart.amount.toFixed(2)} ({up ? "+" : ""}
                {changeFromStart.percent.toFixed(2)}%) ในช่วงนี้
              </span>
            ) : (
              <span className="text-sm text-stone-500">
                {loading ? "กำลังโหลด…" : "—"}
              </span>
            )}
            {hoverTime ? (
              <span className="text-xs text-stone-500">{hoverTime}</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {CHART_RANGES.map((item) => {
            const active = item.id === range;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRange(item.id)}
                className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${
                  active
                    ? "bg-stone-900 font-medium text-white"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative px-2 pb-2 pt-1">
        <div ref={containerRef} className="h-64 w-full sm:h-72" />
        {loading ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-stone-500">
            กำลังโหลดกราฟ…
          </div>
        ) : null}
        {error ? (
          <div className="absolute inset-x-4 top-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
