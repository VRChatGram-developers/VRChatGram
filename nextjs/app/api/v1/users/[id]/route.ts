import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { toJson } from "@/utils/json";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
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
        id: BigInt(id),
      },
      select: {
        id: true,
        name: true,
        introduce: true,
        uid: true,
        profile_url: true,
        header_url: true,
        posts: {
          select: {
            id: true,
            title: true,
            is_sensitive: true,
            view_count: true,
            images: {
              select: {
                id: true,
                url: true,
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
            platform_name: true,
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
      introduce: user?.introduce,
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
