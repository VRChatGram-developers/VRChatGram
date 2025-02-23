import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
const connect = async () => {
  try {
    //prismaでデータベースに接続
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function GET(request: Request) {
  try {
    await connect();
    const { postId } = await request.json();
    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: BigInt(postId) },
      select: {
        id: true,
        title: true,
        view_count: true,
        description: true,
        images: true,
        tags: true,
        likes: true,
        booth_items: {
          include: {
            booth: {
              select: {
                id: true,
                title: true,
                detail: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            my_id: true,
            profile_url: true,
          },
        },
      },
    });

    const otherPostList = await prisma.posts.findMany({
      where: { user_id: post.user.id, id: { not: post.id } },
      select: {
        id: true,
        title: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 4,
    });

    const { likes, ...postData } = post;
    const serializedPost = bigIntToStringMap(postData);
    const likeCount = likes?.length ?? 0;
    const serializedOtherPostList = bigIntToStringMap(otherPostList);

    return NextResponse.json({
      ...serializedPost,
      likeCount,
      otherPostList: serializedOtherPostList,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}