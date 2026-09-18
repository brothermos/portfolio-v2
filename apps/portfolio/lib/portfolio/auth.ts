import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'portfolio_admin';
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

function requireAdminSecret(): string {
  const secret = process.env.PORTFOLIO_ADMIN_SECRET?.trim();
  if (!secret) {
    throw new Error('ยังไม่ได้ตั้งค่า PORTFOLIO_ADMIN_SECRET');
  }
  return secret;
}

function signToken(secret: string): string {
  return createHmac('sha256', secret).update('portfolio-admin-v1').digest('hex');
}

export function isAdminSecretConfigured(): boolean {
  return Boolean(process.env.PORTFOLIO_ADMIN_SECRET?.trim());
}

export function verifyAdminPassword(password: string): boolean {
  if (!isAdminSecretConfigured()) return false;
  const secret = requireAdminSecret();
  const expected = Buffer.from(secret);
  const actual = Buffer.from(password);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!isAdminSecretConfigured()) return false;
  const secret = requireAdminSecret();
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = signToken(secret);
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function setAdminSessionCookie(): Promise<void> {
  const secret = requireAdminSecret();
  const jar = await cookies();
  jar.set(COOKIE_NAME, signToken(secret), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE_SEC,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
