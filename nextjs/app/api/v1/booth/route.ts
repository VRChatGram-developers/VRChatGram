import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // 外部APIのURL
  const url = request.nextUrl.searchParams.get("url");

  try {
    // 外部APIにリクエストを送信
    const response = await fetch(url as string);
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    // エラーハンドリング
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
