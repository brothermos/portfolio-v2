import { NextRequest } from "next/server";

import { fetchFundQuote, FundDataError } from "@/lib/funds/sec";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const symbol = request.nextUrl.searchParams.get("symbol")?.trim();
    if (!symbol) {
      return Response.json({ error: "ไม่ได้ระบุรหัสกองทุน" }, { status: 400 });
    }
    const quote = await fetchFundQuote(symbol);
    return Response.json(quote, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof FundDataError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
