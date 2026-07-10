"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { appPath } from "@/lib/base-path";
import type { StockSearchResult } from "@/lib/stocks/types";

type SymbolPickerProps = {
  onSymbolChange: (symbol: string) => void;
};

async function readSearch(query: string): Promise<StockSearchResult[]> {
  const response = await fetch(
    `${appPath("/api/stocks/search")}?q=${encodeURIComponent(query)}`,
  );
  const body = (await response.json()) as {
    results?: StockSearchResult[];
    error?: string;
  };
  if (!response.ok) {
    throw new Error(body.error ?? `คำขอล้มเหลว (${response.status})`);
  }
  return body.results ?? [];
}

export function SymbolPicker({ onSymbolChange }: SymbolPickerProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const query = draft.trim();

  useEffect(() => {
    if (query.length < 1) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setLoading(true);
      void readSearch(query)
        .then((items) => {
          if (cancelled) return;
          setResults(items);
          setError(null);
          setOpen(true);
          setActiveIndex(items.length > 0 ? 0 : -1);
        })
        .catch((err) => {
          if (cancelled) return;
          setResults([]);
          setError(err instanceof Error ? err.message : "ค้นหาไม่สำเร็จ");
          setOpen(true);
          setActiveIndex(-1);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function clearSearchUi() {
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    setError(null);
    setLoading(false);
  }

  function selectSymbol(next: string) {
    onSymbolChange(next.toUpperCase());
    setDraft("");
    clearSearchUi();
  }

  function handleDraftChange(value: string) {
    setDraft(value);
    if (value.trim().length < 1) {
      clearSearchUi();
      return;
    }
    setOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      selectSymbol(results[activeIndex].symbol);
      return;
    }
    const next = draft.trim().toUpperCase();
    if (!next) return;
    selectSymbol(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => handleDraftChange(event.target.value)}
          onFocus={() => {
            if (query.length > 0) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="ค้นหาชื่อบริษัทหรือตัวย่อ เช่น Apple, AAPL"
          aria-label="ค้นหาหุ้น"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open}
          role="combobox"
          className="min-w-0 flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-emerald-500/60"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-3 py-2 text-white transition-colors hover:bg-stone-800"
          aria-label="ค้นหา"
          title="ค้นหา"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </form>

      {open && query.length > 0 ? (
        <div
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-border bg-white shadow-lg"
        >
          {loading ? (
            <p className="px-3 py-3 text-sm text-stone-500">กำลังค้นหา…</p>
          ) : error ? (
            <p className="px-3 py-3 text-sm text-rose-600">{error}</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-stone-500">ไม่พบผลลัพธ์</p>
          ) : (
            <ul>
              {results.map((item, index) => {
                const active = index === activeIndex;
                return (
                  <li key={`${item.symbol}-${item.exchange}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectSymbol(item.symbol)}
                      className={`flex w-full items-start justify-between gap-3 px-3 py-2.5 text-left transition-colors ${
                        active ? "bg-emerald-50" : "hover:bg-stone-50"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block font-mono text-sm text-stone-900">
                          {item.symbol}
                        </span>
                        <span className="block truncate text-xs text-stone-500">
                          {item.name}
                        </span>
                      </span>
                      <span className="shrink-0 text-right text-[11px] text-stone-400">
                        <span className="block">{item.exchange}</span>
                        <span className="block">{item.type}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
