import { Redis } from '@upstash/redis';

import { buildDefaultPortfolioConfig } from './defaults';
import type { PortfolioConfig } from './types';

const REDIS_KEY = 'portfolio:config:v1';

export class PortfolioStoreError extends Error {
  constructor(
    message: string,
    readonly status: number = 500,
  ) {
    super(message);
    this.name = 'PortfolioStoreError';
  }
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isPortfolioStoreConfigured(): boolean {
  return getRedis() != null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function normalizeConfig(raw: unknown): PortfolioConfig | null {
  if (!isObject(raw) || raw.version !== 1) return null;

  const cashRaw = isObject(raw.cash) ? raw.cash : {};
  const holdingsRaw = isObject(raw.holdings) ? raw.holdings : {};
  const fundHoldingsRaw = isObject(raw.fundHoldings) ? raw.fundHoldings : {};
  const watchlist = Array.isArray(raw.watchlist)
    ? raw.watchlist.filter((item): item is string => typeof item === 'string')
    : [];
  const closedPositions = Array.isArray(raw.closedPositions)
    ? raw.closedPositions
        .filter(isObject)
        .map((item) => ({
          symbol: asString(item.symbol).toUpperCase(),
          quantity: asNumber(item.quantity),
          avgBuyPrice: asNumber(item.avgBuyPrice),
          sellPrice: asNumber(item.sellPrice),
        }))
        .filter((item) => item.symbol.length > 0)
    : [];
  const funds = Array.isArray(raw.funds)
    ? raw.funds
        .filter(isObject)
        .map((item) => ({
          symbol: asString(item.symbol),
          title: asString(item.title),
          projId: asString(item.projId),
          fundClassName: asString(item.fundClassName),
          name: asString(item.name),
          amcName: asString(item.amcName),
        }))
        .filter((item) => item.symbol.length > 0 && item.projId.length > 0)
    : [];

  const holdings: PortfolioConfig['holdings'] = {};
  for (const [symbol, value] of Object.entries(holdingsRaw)) {
    if (!isObject(value)) continue;
    holdings[symbol.toUpperCase()] = {
      quantity: asNumber(value.quantity),
      avgBuyPrice: asNumber(value.avgBuyPrice),
    };
  }

  const fundHoldings: PortfolioConfig['fundHoldings'] = {};
  for (const [symbol, value] of Object.entries(fundHoldingsRaw)) {
    if (!isObject(value)) continue;
    fundHoldings[symbol] = {
      units: asNumber(value.units),
      avgBuyNav: asNumber(value.avgBuyNav),
    };
  }

  return {
    version: 1,
    updatedAt: asString(raw.updatedAt, new Date().toISOString()),
    cash: {
      THB: asNumber(cashRaw.THB),
      USD: asNumber(cashRaw.USD),
    },
    watchlist: watchlist.map((symbol) => symbol.toUpperCase()),
    holdings,
    closedPositions,
    funds,
    fundHoldings,
  };
}

export function validatePortfolioConfig(input: unknown): PortfolioConfig {
  const normalized = normalizeConfig(input);
  if (!normalized) {
    throw new PortfolioStoreError('รูปแบบข้อมูลพอร์ตไม่ถูกต้อง', 400);
  }

  if (normalized.watchlist.length === 0) {
    throw new PortfolioStoreError('ต้องมีหุ้นใน watchlist อย่างน้อย 1 ตัว', 400);
  }

  for (const symbol of normalized.watchlist) {
    if (!/^[A-Z][A-Z0-9.\-]{0,9}$/.test(symbol)) {
      throw new PortfolioStoreError(`ตัวย่อหุ้นไม่ถูกต้อง: ${symbol}`, 400);
    }
    if (!(symbol in normalized.holdings)) {
      throw new PortfolioStoreError(`ขาด holdings ของ ${symbol}`, 400);
    }
  }

  for (const fund of normalized.funds) {
    if (!(fund.symbol in normalized.fundHoldings)) {
      throw new PortfolioStoreError(`ขาด fund holdings ของ ${fund.symbol}`, 400);
    }
  }

  return {
    ...normalized,
    updatedAt: new Date().toISOString(),
  };
}

export async function getPortfolioConfig(): Promise<{
  config: PortfolioConfig;
  source: 'redis' | 'seed';
}> {
  const redis = getRedis();
  if (!redis) {
    return { config: buildDefaultPortfolioConfig(), source: 'seed' };
  }

  try {
    const raw = await redis.get<unknown>(REDIS_KEY);
    const normalized = normalizeConfig(raw);
    if (!normalized) {
      return { config: buildDefaultPortfolioConfig(), source: 'seed' };
    }
    return { config: normalized, source: 'redis' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'อ่านข้อมูลพอร์ตไม่สำเร็จ';
    throw new PortfolioStoreError(message, 502);
  }
}

export async function savePortfolioConfig(input: unknown): Promise<PortfolioConfig> {
  const redis = getRedis();
  if (!redis) {
    throw new PortfolioStoreError(
      'ยังไม่ได้ตั้งค่า UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN',
      503,
    );
  }

  const config = validatePortfolioConfig(input);

  try {
    await redis.set(REDIS_KEY, config);
    return config;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'บันทึกข้อมูลพอร์ตไม่สำเร็จ';
    throw new PortfolioStoreError(message, 502);
  }
}
