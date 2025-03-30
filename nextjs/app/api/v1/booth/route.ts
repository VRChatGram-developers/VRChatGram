import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any) {
  // 外部APIのURL
  const url = req.nextUrl.searchParams.get("url");

  try {
    // 外部APIにリクエストを送信
    const response = await fetch(url);
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    // エラーハンドリング
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
