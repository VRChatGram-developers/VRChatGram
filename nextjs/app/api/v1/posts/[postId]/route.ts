import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  try {
    await connect();
    const { postId } = params;
    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const currentUser = await prisma.users.findFirst({
      where: {
        uid: session?.user.uid,
      },
    });
    console.log(currentUser, "currentUser");

    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: BigInt(postId) },
      select: {
        id: true,
        title: true,
        view_count: true,
        description: true,
        images: true,
        tags: true,
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
            posted_user_id: true,
          },
        },
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

    const serializedPost = bigIntToStringMap(post);
    const serializedOtherPostList = bigIntToStringMap(otherPostList);
    const is_liked = post.likes.some((like) => like.user_id == currentUser?.id);
    console.log(post.likes, "post.likes");
    console.log(currentUser?.id, "currentUser?.id");
    console.log(is_liked, "is_liked");

    return NextResponse.json({
      ...serializedPost,
      otherPostList: serializedOtherPostList,
      is_liked: is_liked,
    });
  } catch (error) {
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}