import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { toJson } from "@/utils/json";

const prisma = new PrismaClient();

const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request) {
  try {
    await connect();
    let user = null;

    const body = await request.json();
    const session = body.session;

    if (session) {
      user = await prisma.users.findUnique({
        where: { uid: session.user.uid },
      });
    }

    const popularPostList = await prisma.posts.findMany({
      orderBy: { likes: { _count: "desc" } },
      select: {
        id: true,
        title: true,
        is_sensitive: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
          },
        },
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
            posted_user_id: true,
          },
        },
      },
      take: Number(12),
    });

    const latestPostList = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        is_sensitive: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
          },
        },
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
            posted_user_id: true,
          },
        },
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
      take: Number(6),
    });

    const latestPostListWithX = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      where: { is_posted_x: true },
      select: {
        id: true,
        is_sensitive: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
          },
        },
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
            posted_user_id: true,
          },
        },
      },
      take: Number(4),
    });

    const latestPostListWithIsLiked = latestPostList.map((post) => ({
      ...post,
      is_liked: post.likes.some((like) => like.user_id == user?.id),
    }));

    const popularPostListWithIsLiked = popularPostList.map((post) => ({
      ...post,
      is_liked: post.likes.some((like) => like.user_id == user?.id),
    }));

    const latestPostListWithXWithIsLiked = latestPostListWithX.map((post) => ({
      ...post,
      is_liked: post.likes.some((like) => like.user_id == user?.id),
    }));

    return NextResponse.json({
      popularPostList: popularPostListWithIsLiked.map(toJson),
      latestPostList: latestPostListWithIsLiked.map(toJson),
      popularTagList: popularTagList.map(toJson),
      latestPostListWithX: latestPostListWithXWithIsLiked.map(toJson),
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
