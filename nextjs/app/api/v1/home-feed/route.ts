import { NextResponse } from "next/server";
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
      where: { deleted_at: null },
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
      where: { deleted_at: null },
      orderBy: { created_at: "desc" },
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
      take: Number(4),
    });

    const latestPostListWithX = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      where: { is_posted_x: true, deleted_at: null },
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
      latestPostListWithX: latestPostListWithXWithIsLiked.map(toJson),
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
