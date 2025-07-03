import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";
import { toJson } from "@/utils/json";
import { Prisma } from "@prisma/client";

export const runtime = "nodejs";

const fetchRecommendPostListByTagName = async (tagName: string) => {
  const where: Prisma.postsWhereInput = {};
  if (tagName) {
    where.tags = {
      some: {
        tag: {
          name: tagName,
        },
      },
    };
  }
  const recommendPostList = await prisma.posts.findMany({
    where: where,
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
          profile_url: true,
          my_id: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: 50,
  });

  return recommendPostList.sort(() => 0.5 - Math.random()).slice(0, 4);
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
    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId, deleted_at: null },
      select: {
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // 投稿の最初のタグを取得
    const postFirstTag = post.tags.map((tag) => tag.tag.name).pop() ?? "";
    const recommendPostList = await fetchRecommendPostListByTagName(postFirstTag);

    // ランダムに並び替えて、最初の4件を取得
    const shuffledRecommendPostList = recommendPostList.sort(() => 0.5 - Math.random()).slice(0, 4);
    const recommendPostListWithLikes =
      shuffledRecommendPostList.map((post) => ({
        ...toJson(post),
        is_liked: post.likes.some((like) => like.user_id == user?.id),
      })) || [];
    const serializedRecommendPostList = bigIntToStringMap(recommendPostListWithLikes);

    return NextResponse.json({
      recommendPostList: serializedRecommendPostList,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
