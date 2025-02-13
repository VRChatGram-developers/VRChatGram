import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { toJson } from "@/utils/json";
const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function GET(request: Request) {
  try {
    await connect();
    const popularTagIdList = await prisma.$queryRaw<{ tag_id: bigint }[]>(
      Prisma.sql`SELECT tag_id FROM post_tags pt
        JOIN posts p ON pt.post_id = p.id 
        JOIN likes i ON p.id = i.post_id
        GROUP BY pt.tag_id
        ORDER BY COUNT(i.id) DESC
        LIMIT ${10}`
    );
    const popularTagList = await prisma.tags.findMany({
      where: { id: { in: popularTagIdList.map((tag) => tag.tag_id) } },
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
