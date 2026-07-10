import { NextRequest } from "next/server";

import {
  fetchSupportResistanceLevels,
  parseSymbolParam,
  StockDataError,
} from "@/lib/stocks/yahoo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const symbol = parseSymbolParam(request.nextUrl.searchParams.get("symbol"));
    const levels = await fetchSupportResistanceLevels(symbol);
    return Response.json(levels, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof StockDataError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
