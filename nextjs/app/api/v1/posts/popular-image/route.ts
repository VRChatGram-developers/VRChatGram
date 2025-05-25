import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET() {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        title: true,
        likes: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
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
      orderBy: { likes: { _count: "desc" } },
      take: 3,
    });

    const topThreePostImages = bigIntToStringMap(
      posts.map((post) => ({
        ...post,
        images: post.images[0],
      }))
    );

    return NextResponse.json({
      topThreePostImages: topThreePostImages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
