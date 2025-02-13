import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { toJson } from "@/utils/json";
import _ from "lodash";
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
  //クエリパラメータからページ番号を取得し、整数に変換（デフォルトは1）
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  //クエリパラメータからページごとの表示数を取得し、整数に変換（デフォルトは10）
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  //検索の開始位置を取得。
  const offset = (page - 1) * limit;

  try {
    await connect();
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      take: Number(limit),
      skip: offset,
      select: {
        id: true,
        title: true,
        is_sensitive: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    const postCount = await prisma.posts.count();

    const chunkedPosts = _.chunk(
      posts.map((post) => ({
        ...toJson(post),
        images: post.images.map(toJson),
      })) || [],
      20
    );

    return NextResponse.json(
      {
        posts: chunkedPosts,
        totalPages: Math.ceil(postCount / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
