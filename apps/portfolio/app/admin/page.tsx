'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { appPath } from '@/lib/base-path';
import type {
  ClosedPosition,
  FundDefinition,
  FundHolding,
  PortfolioConfig,
  StockHolding,
} from '@/lib/portfolio/types';

type AuthState = {
  authenticated: boolean;
  adminSecretConfigured: boolean;
};

type ConfigResponse = {
  config: PortfolioConfig;
  source: 'redis' | 'seed';
  storeConfigured: boolean;
  authenticated: boolean;
  error?: string;
};

const emptyFund = (): FundDefinition => ({
  symbol: '',
  title: '',
  projId: '',
  fundClassName: 'main',
  name: '',
  amcName: '',
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border rounded-2xl border bg-white p-4 sm:p-5">
      <h2 className="mb-4 text-sm font-semibold text-stone-900">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-xs text-stone-600">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'rounded-lg border border-border bg-white px-2.5 py-2 text-sm text-stone-900 outline-none focus:border-emerald-500';

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState<PortfolioConfig | null>(null);
  const [source, setSource] = useState<'redis' | 'seed'>('seed');
  const [storeConfigured, setStoreConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newSymbol, setNewSymbol] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [authRes, configRes] = await Promise.all([
        fetch(appPath('/api/portfolio/auth'), { cache: 'no-store' }),
        fetch(appPath('/api/portfolio/config'), { cache: 'no-store' }),
      ]);
      const authBody = (await authRes.json()) as AuthState & { error?: string };
      const configBody = (await configRes.json()) as ConfigResponse;
      if (!authRes.ok) throw new Error(authBody.error ?? 'ตรวจสถานะล็อกอินไม่สำเร็จ');
      if (!configRes.ok) throw new Error(configBody.error ?? 'โหลดพอร์ตไม่สำเร็จ');
      setAuth({
        authenticated: authBody.authenticated,
        adminSecretConfigured: authBody.adminSecretConfigured,
      });
      setConfig(configBody.config);
      setSource(configBody.source);
      setStoreConfigured(configBody.storeConfigured);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'โหลดไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(appPath('/api/portfolio/auth'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? 'เข้าสู่ระบบไม่สำเร็จ');
      setPassword('');
      setMessage('เข้าสู่ระบบแล้ว');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เข้าสู่ระบบไม่สำเร็จ');
    }
  }

  async function logout() {
    await fetch(appPath('/api/portfolio/auth'), { method: 'DELETE' });
    setMessage('ออกจากระบบแล้ว');
    await load();
  }

  async function save() {
    if (!config) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(appPath('/api/portfolio/config'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });
      const body = (await response.json()) as ConfigResponse;
      if (!response.ok) throw new Error(body.error ?? 'บันทึกไม่สำเร็จ');
      setConfig(body.config);
      setSource(body.source);
      setStoreConfigured(body.storeConfigured);
      setMessage('บันทึกแล้ว — หน้าพอร์ตจะเห็นค่าใหม่ทันที');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  }

  const stockRows = useMemo(() => {
    if (!config) return [];
    return config.watchlist.map((symbol) => ({
      symbol,
      holding: config.holdings[symbol] ?? { quantity: 0, avgBuyPrice: 0 },
    }));
  }, [config]);

  function updateHolding(symbol: string, patch: Partial<StockHolding>) {
    setConfig((prev) => {
      if (!prev) return prev;
      const current = prev.holdings[symbol] ?? { quantity: 0, avgBuyPrice: 0 };
      return {
        ...prev,
        holdings: {
          ...prev.holdings,
          [symbol]: { ...current, ...patch },
        },
      };
    });
  }

  function addStock() {
    const symbol = newSymbol.trim().toUpperCase();
    if (!symbol || !config) return;
    if (config.watchlist.includes(symbol)) {
      setError(`${symbol} มีอยู่แล้ว`);
      return;
    }
    setConfig({
      ...config,
      watchlist: [...config.watchlist, symbol],
      holdings: {
        ...config.holdings,
        [symbol]: { quantity: 0, avgBuyPrice: 0 },
      },
    });
    setNewSymbol('');
    setError(null);
  }

  function removeStock(symbol: string) {
    if (!config) return;
    const { [symbol]: _removed, ...restHoldings } = config.holdings;
    setConfig({
      ...config,
      watchlist: config.watchlist.filter((item) => item !== symbol),
      holdings: restHoldings,
    });
  }

  function updateClosed(index: number, patch: Partial<ClosedPosition>) {
    setConfig((prev) => {
      if (!prev) return prev;
      const closedPositions = prev.closedPositions.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      );
      return { ...prev, closedPositions };
    });
  }

  function addClosed() {
    if (!config) return;
    setConfig({
      ...config,
      closedPositions: [
        ...config.closedPositions,
        { symbol: '', quantity: 0, avgBuyPrice: 0, sellPrice: 0 },
      ],
    });
  }

  function removeClosed(index: number) {
    if (!config) return;
    setConfig({
      ...config,
      closedPositions: config.closedPositions.filter((_, i) => i !== index),
    });
  }

  function updateFund(index: number, patch: Partial<FundDefinition>) {
    setConfig((prev) => {
      if (!prev) return prev;
      const funds = prev.funds.map((item, i) => (i === index ? { ...item, ...patch } : item));
      return { ...prev, funds };
    });
  }

  function updateFundHolding(symbol: string, patch: Partial<FundHolding>) {
    setConfig((prev) => {
      if (!prev) return prev;
      const current = prev.fundHoldings[symbol] ?? { units: 0, avgBuyNav: 0 };
      return {
        ...prev,
        fundHoldings: {
          ...prev.fundHoldings,
          [symbol]: { ...current, ...patch },
        },
      };
    });
  }

  function addFund() {
    if (!config) return;
    const fund = emptyFund();
    const tempSymbol = `NEW-FUND-${config.funds.length + 1}`;
    fund.symbol = tempSymbol;
    fund.title = tempSymbol;
    setConfig({
      ...config,
      funds: [...config.funds, fund],
      fundHoldings: {
        ...config.fundHoldings,
        [tempSymbol]: { units: 0, avgBuyNav: 0 },
      },
    });
  }

  function removeFund(symbol: string) {
    if (!config) return;
    const { [symbol]: _removed, ...rest } = config.fundHoldings;
    setConfig({
      ...config,
      funds: config.funds.filter((fund) => fund.symbol !== symbol),
      fundHoldings: rest,
    });
  }

  function renameFundSymbol(oldSymbol: string, nextSymbolRaw: string) {
    if (!config) return;
    const nextSymbol = nextSymbolRaw.trim();
    if (!nextSymbol || nextSymbol === oldSymbol) return;
    if (config.funds.some((fund) => fund.symbol === nextSymbol)) {
      setError(`กองทุน ${nextSymbol} มีอยู่แล้ว`);
      return;
    }
    const holding = config.fundHoldings[oldSymbol] ?? { units: 0, avgBuyNav: 0 };
    const { [oldSymbol]: _removed, ...rest } = config.fundHoldings;
    setConfig({
      ...config,
      funds: config.funds.map((fund) =>
        fund.symbol === oldSymbol ? { ...fund, symbol: nextSymbol } : fund,
      ),
      fundHoldings: {
        ...rest,
        [nextSymbol]: holding,
      },
    });
    setError(null);
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-stone-600">กำลังโหลด…</p>
      </main>
    );
  }

  if (!auth?.authenticated) {
    return (
      <main className="mx-auto flex min-h-full max-w-md flex-col justify-center px-4 py-16">
        <h1 className="text-2xl font-semibold text-stone-900">แก้ไขพอร์ต</h1>
        <p className="mt-2 text-sm text-stone-600">
          ใส่รหัสผ่านแอดมินเพื่อเพิ่ม/แก้หุ้น กองทุน เงินสด และสถานะที่ปิดแล้ว
        </p>
        {!auth?.adminSecretConfigured ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            ยังไม่ได้ตั้งค่า <code>PORTFOLIO_ADMIN_SECRET</code> บนเซิร์ฟเวอร์
          </p>
        ) : null}
        <form onSubmit={login} className="mt-6 flex flex-col gap-3">
          <Field label="รหัสผ่าน">
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </Field>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <a href={appPath('/')} className="mt-6 text-sm text-stone-500 hover:text-stone-800">
          ← กลับหน้าพอร์ต
        </a>
      </main>
    );
  }

  if (!config) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-rose-600">{error ?? 'ไม่พบข้อมูลพอร์ต'}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8 pb-24">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">แก้ไขพอร์ต</h1>
          <p className="mt-1 text-sm text-stone-600">
            แหล่งข้อมูล: {source === 'redis' ? 'Upstash Redis' : 'ค่าเริ่มต้นในโค้ด'}
            {storeConfigured ? '' : ' · ยังไม่ได้ตั้ง Redis (บันทึกจะไม่ได้)'}
          </p>
          {config.updatedAt !== new Date(0).toISOString() ? (
            <p className="mt-1 text-xs text-stone-500">
              อัปเดตล่าสุด: {new Date(config.updatedAt).toLocaleString('th-TH')}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={appPath('/')}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
          >
            หน้าพอร์ต
          </a>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
          >
            ออกจากระบบ
          </button>
          <button
            type="button"
            disabled={saving || !storeConfigured}
            onClick={() => void save()}
            className="rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            {saving ? 'กำลังบันทึก…' : 'บันทึก'}
          </button>
        </div>
      </header>

      {!storeConfigured ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          ตั้งค่า <code>UPSTASH_REDIS_REST_URL</code> และ <code>UPSTASH_REDIS_REST_TOKEN</code> ใน
          Vercel ก่อน จึงจะบันทึกขึ้นเว็บจริงได้
        </p>
      ) : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      <Section title="เงินสด">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="THB">
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={config.cash.THB}
              onChange={(event) =>
                setConfig({
                  ...config,
                  cash: { ...config.cash, THB: Number(event.target.value) || 0 },
                })
              }
            />
          </Field>
          <Field label="USD">
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={config.cash.USD}
              onChange={(event) =>
                setConfig({
                  ...config,
                  cash: { ...config.cash, USD: Number(event.target.value) || 0 },
                })
              }
            />
          </Field>
        </div>
      </Section>

      <Section title="หุ้นที่ถือ">
        <div className="mb-4 flex flex-wrap gap-2">
          <input
            className={`${inputClass} min-w-[140px] flex-1`}
            placeholder="เพิ่มสัญลักษณ์ เช่น NVDA"
            value={newSymbol}
            onChange={(event) => setNewSymbol(event.target.value.toUpperCase())}
          />
          <button
            type="button"
            onClick={addStock}
            className="rounded-full bg-stone-900 px-3 py-2 text-xs font-medium text-white"
          >
            เพิ่มหุ้น
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {stockRows.map(({ symbol, holding }) => (
            <div
              key={symbol}
              className="grid gap-2 rounded-xl border border-stone-100 bg-stone-50/70 p-3 sm:grid-cols-[90px_1fr_1fr_auto]"
            >
              <div className="font-mono text-sm font-semibold text-stone-900">{symbol}</div>
              <Field label="จำนวนหุ้น">
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={holding.quantity}
                  onChange={(event) =>
                    updateHolding(symbol, { quantity: Number(event.target.value) || 0 })
                  }
                />
              </Field>
              <Field label="ต้นทุนเฉลี่ย">
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={holding.avgBuyPrice}
                  onChange={(event) =>
                    updateHolding(symbol, { avgBuyPrice: Number(event.target.value) || 0 })
                  }
                />
              </Field>
              <button
                type="button"
                onClick={() => removeStock(symbol)}
                className="self-end rounded-lg px-2 py-2 text-xs text-rose-600 hover:bg-rose-50"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="หุ้นที่ปิดสถานะแล้ว">
        <div className="mb-3">
          <button
            type="button"
            onClick={addClosed}
            className="rounded-full bg-stone-900 px-3 py-2 text-xs font-medium text-white"
          >
            เพิ่มรายการ
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {config.closedPositions.map((item, index) => (
            <div
              key={`${item.symbol}-${index}`}
              className="grid gap-2 rounded-xl border border-stone-100 bg-stone-50/70 p-3 sm:grid-cols-2 lg:grid-cols-5"
            >
              <Field label="สัญลักษณ์">
                <input
                  className={inputClass}
                  value={item.symbol}
                  onChange={(event) =>
                    updateClosed(index, { symbol: event.target.value.toUpperCase() })
                  }
                />
              </Field>
              <Field label="จำนวน">
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={item.quantity}
                  onChange={(event) =>
                    updateClosed(index, { quantity: Number(event.target.value) || 0 })
                  }
                />
              </Field>
              <Field label="ต้นทุนเฉลี่ย">
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={item.avgBuyPrice}
                  onChange={(event) =>
                    updateClosed(index, { avgBuyPrice: Number(event.target.value) || 0 })
                  }
                />
              </Field>
              <Field label="ราคาขาย">
                <input
                  type="number"
                  step="any"
                  className={inputClass}
                  value={item.sellPrice}
                  onChange={(event) =>
                    updateClosed(index, { sellPrice: Number(event.target.value) || 0 })
                  }
                />
              </Field>
              <button
                type="button"
                onClick={() => removeClosed(index)}
                className="self-end rounded-lg px-2 py-2 text-xs text-rose-600 hover:bg-rose-50"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="กองทุน">
        <div className="mb-3">
          <button
            type="button"
            onClick={addFund}
            className="rounded-full bg-stone-900 px-3 py-2 text-xs font-medium text-white"
          >
            เพิ่มกองทุน
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {config.funds.map((fund, index) => {
            const holding = config.fundHoldings[fund.symbol] ?? { units: 0, avgBuyNav: 0 };
            return (
              <div
                key={`${index}-${fund.projId}`}
                className="flex flex-col gap-3 rounded-xl border border-stone-100 bg-stone-50/70 p-3"
              >
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="รหัสกอง (symbol)">
                    <input
                      className={inputClass}
                      defaultValue={fund.symbol}
                      key={`symbol-${fund.symbol}`}
                      onBlur={(event) => renameFundSymbol(fund.symbol, event.target.value)}
                    />
                  </Field>
                  <Field label="ชื่อสั้น">
                    <input
                      className={inputClass}
                      value={fund.title}
                      onChange={(event) => updateFund(index, { title: event.target.value })}
                    />
                  </Field>
                  <Field label="projId (SEC)">
                    <input
                      className={inputClass}
                      value={fund.projId}
                      onChange={(event) => updateFund(index, { projId: event.target.value })}
                    />
                  </Field>
                  <Field label="fundClassName">
                    <input
                      className={inputClass}
                      value={fund.fundClassName}
                      onChange={(event) =>
                        updateFund(index, { fundClassName: event.target.value })
                      }
                    />
                  </Field>
                  <Field label="ชื่อเต็ม">
                    <input
                      className={inputClass}
                      value={fund.name}
                      onChange={(event) => updateFund(index, { name: event.target.value })}
                    />
                  </Field>
                  <Field label="บลจ.">
                    <input
                      className={inputClass}
                      value={fund.amcName}
                      onChange={(event) => updateFund(index, { amcName: event.target.value })}
                    />
                  </Field>
                  <Field label="จำนวนหน่วย">
                    <input
                      type="number"
                      step="any"
                      className={inputClass}
                      value={holding.units}
                      onChange={(event) =>
                        updateFundHolding(fund.symbol, {
                          units: Number(event.target.value) || 0,
                        })
                      }
                    />
                  </Field>
                  <Field label="ต้นทุน NAV เฉลี่ย">
                    <input
                      type="number"
                      step="any"
                      className={inputClass}
                      value={holding.avgBuyNav}
                      onChange={(event) =>
                        updateFundHolding(fund.symbol, {
                          avgBuyNav: Number(event.target.value) || 0,
                        })
                      }
                    />
                  </Field>
                </div>
                <button
                  type="button"
                  onClick={() => removeFund(fund.symbol)}
                  className="self-start rounded-lg px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
                >
                  ลบกองทุน
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <button
          type="button"
          disabled={saving || !storeConfigured}
          onClick={() => void save()}
          className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-emerald-800 disabled:opacity-50"
        >
          {saving ? 'กำลังบันทึก…' : 'บันทึกทั้งหมด'}
        </button>
      </div>
    </main>
  );
}
