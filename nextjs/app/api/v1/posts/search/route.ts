import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { bigIntToStringMap } from "../../../../../utils/bigIntToStringMapper";
import { getStartOfWeek } from "../../../../../utils/date";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

const fetchPostsOrderLikesThisWeek = async (limit: number, offset: number, where: Prisma.postsWhereInput) => {
  const startOfWeek = getStartOfWeek();
  const posts = await prisma.posts.findMany({
    where: where,
    include: {
      likes: {
        where: {
          created_at: {
            gte: startOfWeek,
          },
        },
        select: { id: true, post_id: true, user_id: true }, // カウント用にIDだけ取得
      },
      user: {
        select: {
          id: true,
          name: true,
          profile_url: true,
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
    },
  });

  const sorted = posts
    .map((post) => ({
      ...post,
      weeklyLikeCount: post.likes.length,
    }))
    .sort((a, b) => b.weeklyLikeCount - a.weeklyLikeCount);

  const start = offset ?? 0;
  const end = limit ? start + limit : undefined;

  return sorted.slice(start, end);
};

const fetchPostImageUrlWithMaxLikes = async (where: Prisma.postsWhereInput) => {
  const post = await prisma.posts.findFirst({
    where: where,
    select: {
      images: true,
    },
    orderBy: {
      likes: { _count: "desc" },
    },
  });
  return post?.images[0].url;
};

export async function GET(request: Request) {
  try {
    const session = await auth();
    const user = await prisma.users.findFirst({
      where: {
        uid: session?.user.uid,
      },
    });
    // タグ名、投稿名でlike検索
    const url = new URL(request.url);
    const tagName = url.searchParams.get("tag")
      ? decodeURIComponent(url.searchParams.get("tag") as string)
      : undefined;
    const title = url.searchParams.get("title")
      ? decodeURIComponent(url.searchParams.get("title") as string)
      : undefined;
    const sort = url.searchParams.get("sort")
      ? decodeURIComponent(url.searchParams.get("sort") as string)
      : undefined;

    //クエリパラメータからページ番号を取得し、整数に変換（デフォルトは1）
    // const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 20);
    //クエリパラメータからページごとの表示数を取得し、整数に変換（デフォルトは10）
    const limit = parseInt(url.searchParams.get("limit") || "10", 20);
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

    let orderBy: Prisma.postsOrderByWithRelationInput = {};
    if (sort) {
      if (sort === "newest") {
        orderBy = { created_at: "desc" };
      } else if (sort === "popular") {
        orderBy = { likes: { _count: "desc" } };
      }
    }

    let posts;
    if (sort === "this_week_popular") {
      posts = await fetchPostsOrderLikesThisWeek(limit, offset, where);
    } else {
      posts = await prisma.posts.findMany({
        where: where,
        orderBy: orderBy,
        take: Number(limit),
        skip: offset,
        select: {
          id: true,
          title: true,
          show_sensitive_type: true,
          likes: {
            select: {
              id: true,
              post_id: true,
              user_id: true,
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
          images: {
            select: {
              id: true,
              url: true,
              width: true,
              height: true,
            },
          },
        },
      });
    }

    const postsWithIsLiked = posts.map((post) => ({
      ...post,
      is_liked: post.likes.some((like) => like.user_id == user?.id),
    }));
    const postCount = await prisma.posts.count({ where: where });
    // 検索条件内で一番良いねが多い投稿の画像を取得
    const postImageUrlWithMaxLikes = await fetchPostImageUrlWithMaxLikes(where);

    return NextResponse.json(
      {
        posts: bigIntToStringMap(postsWithIsLiked),
        totalPages: Math.ceil(postCount / limit),
        currentPage: page,
        postCount: postCount,
        postImageUrlWithMaxLikes: postImageUrlWithMaxLikes,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
