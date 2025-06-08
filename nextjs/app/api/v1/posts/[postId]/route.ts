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

const updateOrCreatePostTags = async (tags: { tag_id: string }[], postId: string) => {
  await prisma.post_tags.deleteMany({ where: { post_id: postId } });
  await prisma.post_tags.createMany({
    data: tags.map((tag) => ({ post_id: postId, tag_id: tag.tag_id })),
  });
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

export async function PATCH(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const { title, description, boothItems, images, tags, show_sensitive_type } =
      await request.json();

    const user = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const filteredTags = tags.filter((tag: string) => tag !== undefined && tag !== null);

    const tagsToCreate = await Promise.all(
      filteredTags.map(async (tag: string) => {
        return prisma.tags.upsert({
          where: { name: tag },
          update: {}, // 既にあれば何もしない
          create: { name: tag }, // なければ作成
        });
      })
    );

    const tagLinks = tagsToCreate.map((tag) => ({
      tag_id: tag.id,
    }));

    const booths = await Promise.all(
      boothItems.map(
        (item: { id: string; name: string; detail: string; url: string; image: string }) =>
          prisma.booth_items.upsert({
            where: { id: item.id },
            update: {
              title: item.name,
              detail: item.detail,
              url: item.url,
            },
            create: {
              title: item.name,
              url: item.url,
              detail: item.detail,
              image: item.image,
            },
          })
      )
    );

    const post = await prisma.posts.update({
      where: { id: postId },
      data: {
        title: title,
        description: description,
        images: {
          upsert: images.map(
            (image: { id: string; url: string; width: number; height: number }) => ({
              where: { id: image.id },
              update: { url: image.url },
              create: { url: image.url, width: image.width, height: image.height },
            })
          ),
        },
        show_sensitive_type: show_sensitive_type,
        user_id: user.id,
      },
    });

    await updateOrCreatePostTags(tagLinks, post.id);
    await prisma.post_booth_items.deleteMany({ where: { post_id: postId } });
    await prisma.post_booth_items.createMany({
      data: booths.map((booth) => ({
        post_id: postId,
        booth_id: booth.id,
      })),
    });

    return NextResponse.json({ status: 200, message: "投稿に成功しました" });
  } catch (error) {
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}