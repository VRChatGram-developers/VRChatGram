import { NextResponse } from "next/server";

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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    const user = await prisma.users.findUnique({
      where: {
        id: BigInt(id),
      },
      select: {
        id: true,
        name: true,
        introduce: true,
        posts: {
          select: {
            id: true,
            title: true,
            is_sensitive: true,
            view_count: true,
            images: {
              select: {
                id: true,
                url: true,
              },
            },
            likes: {
              select: {
                id: true,
              }
            }
          },
        },
      },
    });

    const postsWithLikes = user?.posts.map(post => ({
      ...toJson(post),
      likesCount: post.likes.length,
      images: post.images.map(toJson)
    })) || [];

    const totalLikes = postsWithLikes.reduce((total, post) => total + post.likesCount, 0);
    const top4Posts = postsWithLikes.sort((a, b) => b.likesCount - a.likesCount).slice(0, 4);
    const totalViews = postsWithLikes.reduce((total, post) => total + post.view_count, 0);

    const response = {
        id: toJson(user?.id),
        name: user?.name,
        introduce: user?.introduce,
        posts: postsWithLikes,
        totalLikes: totalLikes,
        top4Posts: top4Posts,
        totalViews: totalViews,
    };


    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
