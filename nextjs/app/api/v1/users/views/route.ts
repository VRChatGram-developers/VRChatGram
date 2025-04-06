import { NextResponse } from "next/server";

import { toJson } from "@/utils/json";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";
import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import _ from "lodash";

export const runtime = "edge";

export async function GET(request: Request) {
  try {

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしていません" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
      select: {
        id: true,
      },
    });

    const viewedPosts = await prisma.views.findMany({
      where: {
        user_id: user?.id,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        post: {
          select: {
            id: true,
            title: true,
            show_sensitive_type: true,
            view_count: true,
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
            likes: {
              select: {
                id: true,
                user_id: true,
              },
            },
          },
        },
      },
    });

    const postsWithLikes =
      viewedPosts.map(({ post }) => ({
        ...toJson(post),
        is_liked: post.likes.some((like) => like.user_id == user?.id),
      })) || [];

    const viewsPostCount = await prisma.views.count({ where: { user_id: user?.id } });
    const chunkedPostsWithLikes = _.chunk(postsWithLikes, 10);

    return NextResponse.json(
      {
        posts: bigIntToStringMap(chunkedPostsWithLikes),
        totalPages: Math.ceil(viewsPostCount / 10),
        postCount: viewsPostCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
