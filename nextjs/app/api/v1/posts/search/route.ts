import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { bigIntToStringMap } from "../../../../../utils/bigIntToStringMapper";
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
  // タグ名、投稿名でlike検索
  const tagName = request.nextUrl.searchParams.get("tag")
    ? decodeURIComponent(request.nextUrl.searchParams.get("tag") as string)
    : undefined;
  const title = request.nextUrl.searchParams.get("title")
    ? decodeURIComponent(request.nextUrl.searchParams.get("title") as string)
    : undefined;

  //クエリパラメータからページ番号を取得し、整数に変換（デフォルトは1）
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  //クエリパラメータからページごとの表示数を取得し、整数に変換（デフォルトは10）
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  //検索の開始位置を取得。
  const offset = (page - 1) * limit;

  const where: Prisma.postsWhereInput = {};
  if (title) {
    where.title = { contains: title };
  }

  if (tagName) {
    const tagNameWithoutHash = tagName.replace("#", "");
    where.tags = {
      some: { tag: { name: { contains: tagNameWithoutHash } } },
    };
  }

  try {
    await connect();
    const posts = await prisma.posts.findMany({
      where: where,
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

    const postCount = await prisma.posts.count({ where: where });

    return NextResponse.json(
      {
        posts: bigIntToStringMap(posts),
        totalPages: Math.ceil(postCount / limit),
        currentPage: page,
        postCount: postCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
