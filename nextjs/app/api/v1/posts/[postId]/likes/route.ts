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

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  try {
    await connect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }
    const { postId } = params;
    if (!postId) {
      return NextResponse.json({ error: "postIdが指定されていません" }, { status: 400 });
    }

    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId },
    });

    const user = await prisma.users.findUniqueOrThrow({
      where: { uid: session.user.uid },
    });

    const isLiked = await prisma.likes.findFirst({
      where: {
        post_id: post.id,
        user_id: user.id,
      },
    });

    if (isLiked) {
      return NextResponse.json({ error: "すでにいいねしています" }, { status: 400 });
    }

    await prisma.likes.create({
      data: {
        post_id: post.id,
        user_id: user.id,
      },
    });

    return NextResponse.json({ message: "いいねしました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }
    const { postId } = params;
    if (!postId) {
      return NextResponse.json({ error: "postIdが指定されていません" }, { status: 400 });
    }

    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId },
    });

    const user = await prisma.users.findUniqueOrThrow({
      where: { uid: session.user.uid },
    });

    const like = await prisma.likes.findFirst({
      where: {
        post_id: post.id,
        user_id: user.id,
      },
    });

    if (!like) {
      return NextResponse.json({ error: "いいねしていません" }, { status: 400 });
    }

    await prisma.likes.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json({ message: "いいねを解除しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
