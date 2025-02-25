export const runtime = 'edge';

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 外部APIのURL
  const url = new URL(request.url).searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URLが指定されていません" }, { status: 400 });
  }

  try {
    // 外部APIにリクエストを送信
    const response = await fetch(url?.toString());
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    // エラーハンドリング
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
