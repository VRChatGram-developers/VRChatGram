import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://vr-chat-gram.vercel.app", "http://localhost:3000"];

const corsHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true", // 認証情報の送信を許可
};

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = new Headers({
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsHeaders,
    });

    return new NextResponse(null, { headers: preflightHeaders, status: 204 });
  }

  const response = NextResponse.next();
  const headers = new Headers(response.headers);

  if (isAllowedOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new NextResponse(response.body, { status: response.status, headers });
}

export const config = {
  matcher: "/api/:path*", // API ルートに適用
};
