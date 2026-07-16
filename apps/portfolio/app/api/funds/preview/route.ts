import { fetchFundPortfolioPreview, FundDataError } from "@/lib/funds/sec";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchFundPortfolioPreview();
    return Response.json(
      data,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    if (error instanceof FundDataError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
