import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
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

    const otherPostList = await prisma.posts.findMany({
      where: { user_id: post.user.id, id: { not: post.id } },
      select: {
        id: true,
        title: true,
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
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 4,
    });

    const { likes, ...postData } = post;
    const serializedPost = bigIntToStringMap(postData);
    const likeCount = likes?.length ?? 0;
    const serializedOtherPostList = bigIntToStringMap(otherPostList);

    return NextResponse.json({
      ...serializedPost,
      likeCount,
      otherPostList: serializedOtherPostList,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}