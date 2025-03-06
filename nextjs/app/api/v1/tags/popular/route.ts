import { NextResponse } from "next/server";
import { toJson } from "@/utils/json";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET() {
  try {
    const popularTagIdList = await prisma.$queryRaw<{ tag_id: number }[]>`
      SELECT pt.tag_id FROM post_tags pt
      JOIN posts p ON pt.post_id = p.id 
      JOIN likes i ON p.id = i.post_id
      GROUP BY pt.tag_id
      ORDER BY COUNT(i.id) DESC
      LIMIT ${10}
    `;
    const popularTagList = await prisma.tags.findMany({
      where: { id: { in: popularTagIdList.map((tag) => tag.tag_id.toString()) } },
      select: {
        id: true,
        name: true,
      },
      take: Number(6),
    });

    return NextResponse.json(popularTagList.map(toJson));
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  }
}
