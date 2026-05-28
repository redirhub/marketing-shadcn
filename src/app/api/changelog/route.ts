import { NextRequest, NextResponse } from "next/server";
import { fetchChangelogEntries } from "@/lib/services/changelog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "en";
  const cursor = searchParams.get("cursor") || undefined;

  try {
    const result = await fetchChangelogEntries(locale, 10, cursor);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch changelog entries" }, { status: 500 });
  }
}
