import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "edge";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }
    return NextResponse.json({ message: "テスト成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    return NextResponse.json({ message: "テスト投稿成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
