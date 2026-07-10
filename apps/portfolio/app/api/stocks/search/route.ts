import { NextRequest } from "next/server";

import { searchStocks, StockDataError } from "@/lib/stocks/yahoo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
    if (!q) {
      return Response.json({ results: [] });
    }

    const results = await searchStocks(q);
    return Response.json(
      { results },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    if (error instanceof StockDataError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
