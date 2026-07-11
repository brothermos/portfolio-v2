import { fetchPortfolioPreview, StockDataError } from "@/lib/stocks/yahoo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchPortfolioPreview();
    return Response.json(data, {
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
