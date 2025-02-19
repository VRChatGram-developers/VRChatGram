import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";

//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
  try {
    //prismaでデータベースに接続
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request) {
  try {
    await connect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const { title, description, boothItems, images, tags, ageRestriction } = await request.json();
    
    const user = await prisma.users.findUnique({
      where: {
        uid: session.user.id,
      },
    });
    
    

    const post = await prisma.posts.create({
      data: {
        title,
        description,
        booth_items: boothItems,
        images,
        tags,
        ageRestriction,
        userId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}