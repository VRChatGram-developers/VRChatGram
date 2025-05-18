import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";
import { updateUser } from "@/libs/firebase/firebase-auth-for-edge";

export const runtime = "edge";

const updateEmailToFirebase = async (uid: string, newEmail: string) => {
  try {
    await updateUser(uid, {
      email: newEmail,
    });
    console.log("メールアドレスが更新されました:");
  } catch (error) {
    console.error("メールアドレスの更新に失敗しました:", error);
  }
};

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    const { currentEmail, newEmail } = await request.json();

    const userByCurrentEmail = await prisma.users.findFirst({
      where: {
        email: currentEmail,
      },
    });

    if (!userByCurrentEmail) {
      return NextResponse.json({ error: "メールアドレスが見つかりません" }, { status: 404 });
    }
    if (currentEmail && newEmail) {
      await prisma.$transaction(async (tx) => {
        await updateEmailToFirebase(session.user.uid, newEmail);
        await tx.users.update({
          where: { id: userByCurrentEmail.id },
          data: {
            email: newEmail,
          },
        });
      });
    }

    return NextResponse.json({ message: "メールアドレスが更新されました" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { error: `データベースへの接続に失敗しました: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "予期せぬエラーが発生しました" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
