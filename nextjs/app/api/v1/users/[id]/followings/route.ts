import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const runtime = "edge";


const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    await prisma.follows.create({
      data: {
        following_id: BigInt(id),
        follower_id: BigInt(1),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    await connect();
    return NextResponse.json({ message: "フォローしました" });
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    const followUser = await prisma.follows.findFirst({
      where: {
        following_id: BigInt(Number(id)),
        follower_id: 1,
      },
    });
    if (!followUser) {
      return NextResponse.json({ message: "フォローユーザー見つかりません" }, { status: 404 });
    }
    await prisma.follows.delete({
      where: {
        id: followUser.id,
      },
    });
    return NextResponse.json({ message: "フォロー解除しました" });
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
}
