import { NextResponse } from "next/server";
import { getNews } from "@/lib/blog/news";

/** JSON cu noutățile din trafic (titlu, rezumat, sursă, link). Cache 1 oră. */
export const revalidate = 3600;

export async function GET() {
  const items = await getNews(30);
  return NextResponse.json(
    { generatedAt: new Date().toISOString(), count: items.length, items },
    { headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=600" } }
  );
}
