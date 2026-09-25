'use client';

import gsap from 'gsap';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { appPath } from '@/lib/base-path';
import type { FundPortfolioPreviewItem } from '@/lib/funds/sec';
import type {
  ClosedPositionItem,
  ClosedPositionsSummary,
  PortfolioPreviewItem,
  PortfolioSummary,
  StockQuote,
  SupportResistanceLevels,
} from '@/lib/stocks/types';

import { ClosedPositions } from './closed-positions';
import { CryptoPreview } from './crypto-preview';
import { FundPreview } from './fund-preview';
import { FundHoldingDetail } from './fund-holding-detail';
import { LevelsPanel } from './levels-panel';
import { MarketPreview } from './market-preview';
import { PageLoader } from './page-loader';
import { HoldingDetail } from './holding-detail';
import { PortfolioPreview } from './portfolio-preview';
import { PriceChart } from './price-chart';
import { PriceContext } from './price-context';
import { QuoteStrip } from './quote-strip';
import { ScrollToTop } from './scroll-to-top';

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
  const [portfolioItems, setPortfolioItems] = useState<PortfolioPreviewItem[]>([]);
  const [cryptoItems, setCryptoItems] = useState<PortfolioPreviewItem[]>([]);
  const [cryptoSummary, setCryptoSummary] = useState<PortfolioSummary | null>(null);
  const [fundPortfolioItems, setFundPortfolioItems] = useState<FundPortfolioPreviewItem[]>([]);
  const [closedPositions, setClosedPositions] = useState<ClosedPositionItem[]>([]);
  const [closedSummary, setClosedSummary] = useState<ClosedPositionsSummary | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const shouldScrollToDetailRef = useRef(false);

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

  const handlePortfolioItemsChange = useCallback((items: PortfolioPreviewItem[]) => {
    setPortfolioItems(items);
  }, []);

  const handleCryptoChange = useCallback(
    (items: PortfolioPreviewItem[], summary: PortfolioSummary | null) => {
      setCryptoItems(items);
      setCryptoSummary(summary);
    },
    [],
  );

  const handleFundPortfolioItemsChange = useCallback((items: FundPortfolioPreviewItem[]) => {
    setFundPortfolioItems(items);
  }, []);

  const handleClosedPositionsChange = useCallback(
    (items: ClosedPositionItem[], summary: ClosedPositionsSummary | null) => {
      setClosedPositions(items);
      setClosedSummary(summary);
    },
    [],
  );

  const selectedHolding =
    assetKind === 'stock'
      ? (portfolioItems.find((item) => item.symbol === symbol) ??
        cryptoItems.find((item) => item.symbol === symbol) ??
        null)
      : null;
  const selectedFundHolding =
    assetKind === 'fund'
      ? (fundPortfolioItems.find((item) => item.symbol === symbol) ?? null)
      : null;

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
    shouldScrollToDetailRef.current = true;
  }

  useEffect(() => {
    if (!shouldScrollToDetailRef.current || showLoader) return;
    shouldScrollToDetailRef.current = false;
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [symbol, assetKind, showLoader]);

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
      {!showLoader ? <ScrollToTop /> : null}

      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"
        aria-hidden={showLoader}
      >
        <header data-reveal className="relative flex items-start gap-4 pr-16 sm:pr-20">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight text-emerald-700 sm:text-3xl">
                My Wealth Stocks Portfolio
              </h1>
              <Link
                href="/admin"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-emerald-50 hover:text-emerald-700 sm:h-9 sm:w-9"
                aria-label="แก้ไขพอร์ต"
                title="แก้ไขพอร์ต"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]"
                  aria-hidden
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </Link>
            </div>
            <p className="max-w-xl text-sm text-stone-500">รวมหุ้นและกองทุกที่ผมถือ</p>
          </div>
          <Link
            href="/"
            className="absolute top-0 right-0 flex h-14 w-14 items-center justify-center transition-transform duration-200 ease-out hover:scale-110 sm:h-16 sm:w-16"
            aria-label="กลับหน้าหลัก"
            title="กลับหน้าหลัก"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={appPath('/images/macbook.png')}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
          </Link>
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
            onItemsChange={handleFundPortfolioItemsChange}
          />
        </div>

        <div data-reveal>
          <CryptoPreview
            items={cryptoItems}
            summary={cryptoSummary}
            selectedSymbol={assetKind === 'stock' ? symbol : ''}
            onSelectSymbol={(next) => selectAsset('stock', next)}
          />
        </div>

        <div data-reveal>
          <PortfolioPreview
            selectedSymbol={assetKind === 'stock' ? symbol : ''}
            onSelectSymbol={(next) => selectAsset('stock', next)}
            onReady={markPortfolioReady}
            onItemsChange={handlePortfolioItemsChange}
            onCryptoChange={handleCryptoChange}
            onClosedPositionsChange={handleClosedPositionsChange}
          />
        </div>

        <div ref={detailRef} data-reveal>
          <QuoteStrip
            quote={quote}
            loading={quoteLoading}
            polling={polling}
            error={quoteError}
          />
        </div>

        <div data-reveal>
          <PriceChart key={`${assetKind}-${symbol}`} symbol={symbol} assetKind={assetKind} />
        </div>

        {assetKind === 'stock' && selectedHolding && selectedHolding.shares > 0 ? (
          <div data-reveal>
            <HoldingDetail holding={selectedHolding} />
          </div>
        ) : null}

        {assetKind === 'fund' && selectedFundHolding && selectedFundHolding.units > 0 ? (
          <div data-reveal>
            <FundHoldingDetail holding={selectedFundHolding} />
          </div>
        ) : null}

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

        {closedSummary && closedPositions.length > 0 ? (
          <div data-reveal>
            <ClosedPositions items={closedPositions} summary={closedSummary} />
          </div>
        ) : null}
      </div>
    </>
  );
}
