
export const runtime = 'edge';


import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { auth } from "@/libs/firebase/auth5";
const prisma = new PrismaClient();

const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function GET(request: Request) {
  try {
    await connect();
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
    let currentUser;
    if (session && session.user) {
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
      },
    });

    const isCurrentUser = currentUser?.id === user?.id;

    const postsWithLikes =
      user?.posts.map((post) => ({
        ...post,
        likesCount: post.likes.length,
        images: post.images.map((image) => ({
          ...image,
          url: image.url,
        })),
      })) || [];

    const totalLikes = postsWithLikes.reduce((total, post) => total + post.likesCount, 0);
    const top4Posts = postsWithLikes.sort((a, b) => b.likesCount - a.likesCount).slice(0, 4);
    const totalViews = postsWithLikes.reduce((total, post) => total + post.view_count, 0);
    const chunkedPostsWithLikes = _.chunk(postsWithLikes, 20);

    const response = {
      id: user?.id,
      name: user?.name,
      introduce: user?.introduce,
      posts: chunkedPostsWithLikes,
      totalLikes: totalLikes,
      top4Posts: top4Posts,
      totalViews: totalViews,
      isCurrentUser: isCurrentUser,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
