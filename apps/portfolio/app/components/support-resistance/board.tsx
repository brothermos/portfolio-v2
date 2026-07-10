'use client';

import gsap from 'gsap';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { appPath } from '@/lib/base-path';
import type { StockQuote, SupportResistanceLevels } from '@/lib/stocks/types';

import { FundPreview } from './fund-preview';
import { LevelsPanel } from './levels-panel';
import { MarketPreview } from './market-preview';
import { PageLoader } from './page-loader';
import { PortfolioPreview } from './portfolio-preview';
import { PriceChart } from './price-chart';
import { PriceContext } from './price-context';
import { QuoteStrip } from './quote-strip';
import { SymbolPicker } from './symbol-picker';

const POLL_MS = 15_000;

type AssetKind = 'stock' | 'fund';

async function readJson<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(body.error ?? `คำขอล้มเหลว (${response.status})`);
  }
  return body;
}

type SupportResistanceBoardProps = {
  initialSymbol?: string;
};

export function SupportResistanceBoard({ initialSymbol }: SupportResistanceBoardProps) {
  const [assetKind, setAssetKind] = useState<AssetKind>('stock');
  const [symbol, setSymbol] = useState<string>(
    initialSymbol && /^[A-Z][A-Z0-9.\-]{0,9}$/.test(initialSymbol)
      ? initialSymbol
      : 'SPY',
  );
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [levels, setLevels] = useState<SupportResistanceLevels | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [levelsLoading, setLevelsLoading] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [levelsError, setLevelsError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);
  const [boot, setBoot] = useState({ market: false, fund: false, portfolio: false });
  const [showLoader, setShowLoader] = useState(true);

  const contentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  const pageLoading = !boot.market || !boot.fund || !boot.portfolio;

  const markMarketReady = useCallback(() => {
    setBoot((prev) => (prev.market ? prev : { ...prev, market: true }));
  }, []);
  const markFundReady = useCallback(() => {
    setBoot((prev) => (prev.fund ? prev : { ...prev, fund: true }));
  }, []);
  const markPortfolioReady = useCallback(() => {
    setBoot((prev) => (prev.portfolio ? prev : { ...prev, portfolio: true }));
  }, []);

  function selectAsset(nextKind: AssetKind, nextSymbol: string) {
    if (nextKind === assetKind && nextSymbol === symbol) return;
    setAssetKind(nextKind);
    setSymbol(nextSymbol);
    setQuote(null);
    setLevels(null);
    setQuoteLoading(true);
    setLevelsLoading(true);
    setQuoteError(null);
    setLevelsError(null);
  }

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');
    gsap.set(targets, { opacity: 0, y: 24 });
  }, []);

  useEffect(() => {
    if (pageLoading || revealedRef.current) return;
    revealedRef.current = true;

    const root = contentRef.current;
    if (!root) {
      setShowLoader(false);
      return;
    }

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setShowLoader(false),
      });

      if (loaderRef.current) {
        tl.to(loaderRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' });
      }

      tl.to(
        targets,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
        },
        '-=0.05',
      );
    }, root);

    return () => ctx.revert();
  }, [pageLoading]);

  useEffect(() => {
    let cancelled = false;

    async function loadLevels() {
      try {
        const endpoint =
          assetKind === 'fund' ? appPath('/api/funds/levels') : appPath('/api/stocks/levels');
        const data = await readJson<SupportResistanceLevels>(
          await fetch(`${endpoint}?symbol=${encodeURIComponent(symbol)}`),
        );
        if (!cancelled) {
          setLevels(data);
          setLevelsError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setLevels(null);
          setLevelsError(error instanceof Error ? error.message : 'โหลดแนวรับแนวต้านไม่สำเร็จ');
        }
      } finally {
        if (!cancelled) setLevelsLoading(false);
      }
    }

    void loadLevels();
    return () => {
      cancelled = true;
    };
  }, [symbol, assetKind]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    async function loadQuote() {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        setPolling(false);
        return;
      }

      setPolling(true);
      try {
        const endpoint =
          assetKind === 'fund' ? appPath('/api/funds/quote') : appPath('/api/stocks/quote');
        const data = await readJson<StockQuote>(
          await fetch(`${endpoint}?symbol=${encodeURIComponent(symbol)}`),
        );
        if (!cancelled) {
          setQuote(data);
          setQuoteError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setQuoteError(error instanceof Error ? error.message : 'โหลดราคาไม่สำเร็จ');
        }
      } finally {
        if (!cancelled) setQuoteLoading(false);
      }
    }

    function startPolling() {
      void loadQuote();
      if (timer) clearInterval(timer);
      // กองทุนเป็น NAV รายวัน ไม่ต้อง poll ถี่
      const interval = assetKind === 'fund' ? 60_000 : POLL_MS;
      timer = setInterval(() => {
        void loadQuote();
      }, interval);
    }

    function onVisibility() {
      if (document.visibilityState === 'visible') {
        startPolling();
      } else {
        setPolling(false);
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
    }

    startPolling();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [symbol, assetKind]);

  return (
    <>
      {showLoader ? <PageLoader ref={loaderRef} /> : null}

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"
        aria-hidden={showLoader}
      >
        <header data-reveal className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-emerald-700 sm:text-3xl">
              My Wealth Stocks Portfolio
            </h1>
            <p className="max-w-xl text-sm text-stone-500">รวมหุ้นและกองทุกที่ผมถือ</p>
          </div>
          <a
            href="/"
            className="mt-0.5 flex h-16 w-16 shrink-0 items-center justify-center transition-transform duration-200 ease-out hover:scale-110 sm:mt-1 sm:h-20 sm:w-20"
            aria-label="กลับหน้าหลัก"
            title="กลับหน้าหลัก"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={appPath('/images/macbook.png')}
              alt=""
              width={80}
              height={80}
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </a>
        </header>

        <div data-reveal>
          <MarketPreview
            selectedSymbol={assetKind === 'stock' ? symbol : null}
            onSelectSymbol={(next) => selectAsset('stock', next)}
            onReady={markMarketReady}
          />
        </div>

        <div data-reveal>
          <FundPreview
            selectedSymbol={assetKind === 'fund' ? symbol : null}
            onSelectSymbol={(next) => selectAsset('fund', next)}
            onReady={markFundReady}
          />
        </div>

        <div data-reveal>
          <PortfolioPreview
            selectedSymbol={assetKind === 'stock' ? symbol : ''}
            onSelectSymbol={(next) => selectAsset('stock', next)}
            onReady={markPortfolioReady}
          />
        </div>

        <div data-reveal>
          <SymbolPicker onSymbolChange={(next) => selectAsset('stock', next)} />
        </div>

        <div data-reveal>
          <QuoteStrip quote={quote} loading={quoteLoading} polling={polling} error={quoteError} />
        </div>

        <div data-reveal>
          <PriceChart key={`${assetKind}-${symbol}`} symbol={symbol} assetKind={assetKind} />
        </div>

        <div data-reveal className="grid gap-6 lg:grid-cols-2">
          <LevelsPanel
            data={levels}
            quote={quote}
            loading={levelsLoading}
            error={levelsError}
            assetKind={assetKind}
          />
          <PriceContext data={levels} quote={quote} />
        </div>
      </div>
    </>
  );
}
