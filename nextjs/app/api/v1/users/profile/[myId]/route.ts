import { NextResponse } from "next/server";

import { toJson } from "@/utils/json";
import _ from "lodash";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET(request: Request, { params }: { params: Promise<{ myId: string }> }) {
  try {
    const { myId } = await params;
    if (!myId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
    let currentUser;
    if (session) {
      currentUser = await prisma.users.findUnique({
        where: {
          uid: session.user.uid,
        },
        select: {
          id: true,
        },
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        my_id: myId,
      },
      select: {
        id: true,
        name: true,
        introduction_title: true,
        introduction_detail: true,
        uid: true,
        profile_url: true,
        header_url: true,
        posts: {
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
            likes: {
              select: {
                id: true,
              },
            },
          },
        },
        social_links: {
          select: {
            id: true,
            platform_types: true,
            platform_url: true,
          },
        },
      },
    });

    const isCurrentUser = currentUser?.id === user?.id;
    const postsWithLikes =
      user?.posts.map((post) => ({
        ...toJson(post),
        likesCount: post.likes.length,
        images: post.images.map(toJson),
      })) || [];

    const totalLikes = postsWithLikes.reduce((total, post) => total + post.likesCount, 0);
    const top4Posts = postsWithLikes.sort((a, b) => b.likesCount - a.likesCount).slice(0, 4);
    const totalViews = postsWithLikes.reduce((total, post) => total + post.view_count, 0);
    const chunkedPostsWithLikes = _.chunk(postsWithLikes, 20);

    const response = {
      id: toJson(user?.id),
      name: user?.name,
      introduction_title: user?.introduction_title,
      introduction_detail: user?.introduction_detail,
      profile_url: user?.profile_url,
      header_url: user?.header_url,
      posts: chunkedPostsWithLikes,
      totalLikes: totalLikes,
      top4Posts: top4Posts,
      totalViews: totalViews,
      isCurrentUser: isCurrentUser,
      social_links: user?.social_links.map(toJson),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
