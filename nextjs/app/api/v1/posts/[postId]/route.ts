import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";
import { toJson } from "@/utils/json";
import { Prisma } from "@prisma/client";

export const runtime = "edge";

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

const fetchOtherPostList = async (userId: string, postId: string) => {
  return await prisma.posts.findMany({
    where: { user_id: userId, id: { not: postId } },
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
    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        view_count: true,
        description: true,
        images: true,
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
        likes: true,
        booth_items: {
          include: {
            booth: {
              select: {
                id: true,
                title: true,
                detail: true,
                image: true,
                url: true,
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
            social_links: {
              select: {
                platform_types: true,
                platform_url: true,
              },
            },
          },
        },
      },
    });

    const otherPostList = await fetchOtherPostList(post.user.id, post.id);

    // 投稿の最初のタグを取得
    const postFirstTag = post.tags.map((tag) => tag.tag.name).pop() ?? "";
    // 投稿の最初のタグと同じタグを持つ投稿を取得
    const recommendPostList = await fetchRecommendPostListByTagName(postFirstTag);

    // ランダムに並び替えて、最初の4件を取得
    const shuffledRecommendPostList = recommendPostList.sort(() => 0.5 - Math.random()).slice(0, 4);
    const recommendPostListWithLikes =
      shuffledRecommendPostList.map((post) => ({
        ...toJson(post),
        is_liked: post.likes.some((like) => like.user_id == user?.id),
      })) || [];
    const serializedRecommendPostList = bigIntToStringMap(recommendPostListWithLikes);

    const { likes, ...postData } = post;
    const isLiked = likes.some((like) => like.user_id === user?.id);
    const serializedPost = bigIntToStringMap(postData);
    const likeCount = likes?.length ?? 0;

    const otherPostListWithLikes =
      otherPostList.map((post) => ({
        ...toJson(post),
        is_liked: post.likes.some((like) => like.user_id == user?.id),
      })) || [];
    const serializedOtherPostList = bigIntToStringMap(otherPostListWithLikes);

    return NextResponse.json({
      ...serializedPost,
      likeCount,
      isLiked,
      otherPostList: serializedOtherPostList,
      recommendPostList: serializedRecommendPostList,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}