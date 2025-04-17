import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { toJson } from "@/utils/json";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    let user = null;

    const body = await request.json();
    const session = body.session;

    if (session) {
      user = await prisma.users.findFirst({
        where: { uid: session.user.uid },
      });
    }

    const popularPostList = await prisma.posts.findMany({
      orderBy: { likes: { _count: "desc" } },
      select: {
        id: true,
        title: true,
        show_sensitive_type: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
            my_id: true,
          },
        },
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
          },
        },
      },
      take: Number(16),
    });

    const latestPostList = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        show_sensitive_type: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
            my_id: true,
          },
        },
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
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
      where: { id: { in: popularTagIdList.map((tag) => tag.tag_id.toString()) } },
      select: {
        id: true,
        name: true,
        top_post_image_url: true,
      },
      take: Number(6),
    });

    const latestPostListWithX = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      where: { is_posted_x: true },
      select: {
        id: true,
        show_sensitive_type: true,
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_url: true,
            my_id: true,
          },
        },
        likes: {
          select: {
            id: true,
            post_id: true,
            user_id: true,
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
