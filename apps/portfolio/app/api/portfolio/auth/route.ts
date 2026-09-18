import {
  clearAdminSessionCookie,
  isAdminAuthenticated,
  isAdminSecretConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
} from '@/lib/portfolio/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return Response.json(
    {
      authenticated,
      adminSecretConfigured: isAdminSecretConfigured(),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  try {
    if (!isAdminSecretConfigured()) {
      return Response.json(
        { error: 'ยังไม่ได้ตั้งค่า PORTFOLIO_ADMIN_SECRET' },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { password?: string };
    const password = typeof body.password === 'string' ? body.password : '';
    if (!verifyAdminPassword(password)) {
      return Response.json({ error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }

    await setAdminSessionCookie();
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'เข้าสู่ระบบไม่สำเร็จ';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
