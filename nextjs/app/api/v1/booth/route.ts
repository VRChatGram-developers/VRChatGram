import { NextResponse } from "next/server";

export async function GET(req, res) {
    // 外部APIのURL
    const url = req.nextUrl.searchParams.get('url');
  
    try {
      // 外部APIにリクエストを送信
      const response = await fetch(url);
      const result = await response.json();
      return NextResponse.json(result);
    } catch (error) {
      // エラーハンドリング
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  