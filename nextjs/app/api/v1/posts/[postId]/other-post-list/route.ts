import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";
import { toJson } from "@/utils/json";

export const runtime = "nodejs";

const fetchOtherPostList = async (userId: string, postId: string) => {
  return await prisma.posts.findMany({
    where: { user_id: userId, id: { not: postId }, deleted_at: null },
    select: {
      id: true,
      title: true,
      likes: {
        select: {
          id: true,
          post_id: true,
          user_id: true,
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          width: true,
          height: true,
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
    orderBy: {
      created_at: "desc",
    },
    take: 4,
  });
};

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
    const session = await auth();
    const user = session
      ? await prisma.users.findFirst({ where: { uid: session?.user.uid } })
      : null;

    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const post = await prisma.posts.findFirst({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ error: "postが見つかりません" }, { status: 400 });
    }

    const otherPostList = await fetchOtherPostList(post.user_id, postId);

    const otherPostListWithLikes =
      otherPostList.map((post) => ({
        ...toJson(post),
        is_liked: post.likes.some((like) => like.user_id == user?.id),
      })) || [];
    const serializedOtherPostList = bigIntToStringMap(otherPostListWithLikes);

    return NextResponse.json({
      otherPostList: serializedOtherPostList,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
