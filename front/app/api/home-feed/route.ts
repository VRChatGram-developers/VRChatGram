import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { toJson } from "@/utils/json";
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

export async function GET() {
  try {
    await connect();
    const popularPostList = await prisma.posts.findMany({
      orderBy: { likes: { _count: "desc" } },
      select: {
        id: true,
        is_sensitive: true,
        images: true,
      },
      take: Number(10),
    });

    const latestPostList = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        is_sensitive: true,
        images: true,
      },
      take: Number(4),
    });

    const popularTagIdList = await prisma.$queryRaw<{ tag_id: bigint }[]>(
      Prisma.sql`SELECT tag_id FROM post_tags pt
      JOIN posts p ON pt.post_id = p.id 
      JOIN likes i ON p.id = i.post_id
      GROUP BY pt.tag_id
      ORDER BY COUNT(i.id) DESC
      LIMIT ${10}`
    );

    const popularTagList = await prisma.tags.findMany({
      where: { id: { in: popularTagIdList.map((tag) => tag.tag_id) } },
      select: {
        id: true,
        name: true,
      },
    });

    const latestPostListWithX = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      where: { is_posted_x: true },
      select: {
        id: true,
        is_sensitive: true,
        images: true,
        is_posted_x: true,
      },
      take: Number(4),
    });

    return NextResponse.json({
      popularPostList: popularPostList.map(toJson),
      latestPosts: latestPostList.map(toJson),
      popularTagList: popularTagList.map(toJson),
      latestPostListWithX: latestPostListWithX.map(toJson),
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
