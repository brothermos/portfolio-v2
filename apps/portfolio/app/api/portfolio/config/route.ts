import { isAdminAuthenticated } from '@/lib/portfolio/auth';
import {
  getPortfolioConfig,
  isPortfolioStoreConfigured,
  PortfolioStoreError,
  savePortfolioConfig,
} from '@/lib/portfolio/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [{ config, source }, authenticated] = await Promise.all([
      getPortfolioConfig(),
      isAdminAuthenticated(),
    ]);

    return Response.json(
      {
        config,
        source,
        storeConfigured: isPortfolioStoreConfigured(),
        authenticated,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    if (error instanceof PortfolioStoreError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return Response.json({ error: 'ต้องเข้าสู่ระบบก่อน' }, { status: 401 });
    }

    const body = (await request.json()) as { config?: unknown };
    const saved = await savePortfolioConfig(body.config);

    return Response.json(
      {
        config: saved,
        source: 'redis' as const,
        storeConfigured: true,
        authenticated: true,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    if (error instanceof PortfolioStoreError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
