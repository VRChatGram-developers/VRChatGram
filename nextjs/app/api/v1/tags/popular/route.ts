import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ limit: string; isFeatchedPostImage: string }>;
  }
) {
  const { limit, isFeatchedPostImage } = await params;

  try {
    const popularTagList = await prisma.$queryRaw<{ id: string; name: string }[]>`
    SELECT t.id, t.name FROM tags t
    JOIN post_tags pt ON t.id = pt.tag_id
    JOIN posts p ON pt.post_id = p.id 
    GROUP BY t.id
    ORDER BY COUNT(p.id) DESC
    LIMIT ${Number(limit)}
    `;
    if (isFeatchedPostImage.toLowerCase() === "true") {
      // ここでは、post_imagesテーブルから、post_idごとに、urlが最も多いものを取得する
      const popularPostImageByTagId = await prisma.post_tags.findMany({
        select: {
          tag_id: true,
          post: {
            select: {
              images: {
                select: {
                  url: true,
                },
                take: 1,
              },
              _count: {
                select: {
                  likes: true,
                },
              },
            },
          },
        },
        where: {
          tag_id: {
            in: popularTagList.map((tag) => tag.id.toString()),
          },
        },
        orderBy: {
          post: {
            likes: {
              _count: "desc",
            },
          },
        },
        take: Number(limit),
      })

      return NextResponse.json(
        popularTagList.map((tag) => {
          return {
            id: tag.id,
            name: tag.name,
            url: popularPostImageByTagId.find((post) => post.tag_id === tag.id)?.post.images[0].url,
          };
        })
      );
    }

    return NextResponse.json(
      popularTagList.map((tag) => ({ tag: { id: tag.id, name: tag.name } }))
    );
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
