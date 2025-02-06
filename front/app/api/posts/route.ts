import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
  try {
    //prismaでデータベースに接続
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order = searchParams.get("order") || "desc";
  const limit = searchParams.get("limit") || "10";


  try {
    await connect();
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: order as "asc" | "desc" },
      take: Number(limit),
    });

    const serializedPosts = posts.map((post) => ({
      ...post,
      id: post.id.toString(),
      user_id: post.user_id.toString(),
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString(),
      deleted_at: post.deleted_at ? post.deleted_at.toISOString() : null,
    }));
    return NextResponse.json({ posts: serializedPosts });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
