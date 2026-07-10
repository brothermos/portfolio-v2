import { NextRequest } from "next/server";

import { fetchFundChart, FundDataError } from "@/lib/funds/settrade";
import { isChartRangeId } from "@/lib/stocks/chart-ranges";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const symbol = request.nextUrl.searchParams.get("symbol")?.trim();
    if (!symbol) {
      return Response.json({ error: "ไม่ได้ระบุรหัสกองทุน" }, { status: 400 });
    }
    const rangeRaw = (request.nextUrl.searchParams.get("range") ?? "1M").toUpperCase();
    if (!isChartRangeId(rangeRaw)) {
      return Response.json({ error: "ช่วงเวลากราฟไม่ถูกต้อง" }, { status: 400 });
    }
    const series = await fetchFundChart(symbol, rangeRaw);
    return Response.json(series, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof FundDataError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
