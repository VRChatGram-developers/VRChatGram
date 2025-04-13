import { NextResponse } from "next/server";

import { toJson } from "@/utils/json";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";
import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import _ from "lodash";

export const runtime = "edge";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const likedPosts = await prisma.likes.findMany({
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
          },
        },
      },
    });

    const postsWithLikes = likedPosts.map(({ post }) => ({ ...toJson(post), isLiked: true }));
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
