import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as authClient } from "@/libs/firebase/client";
import { updateUser } from "@/libs/firebase/firebase-auth-for-edge";

export const runtime = "edge";

const updatePasswordToFirebase = async (
  uid: string,
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  // 現在のパスワードを比較する
  const token = await signInWithEmailAndPassword(authClient, email, currentPassword);

  if (!token) {
    return;
  }

  try {
    await updateUser(uid, {
      password: newPassword,
    });
  } catch (error) {
    console.error("パスワードの更新に失敗しました:", error);
  }
};

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    const userByFetchedDb = await prisma.users.findFirst({
      where: {
        uid: session.user.uid,
      },
    });

    if (!userByFetchedDb) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (newPassword && currentPassword != newPassword) {
      await updatePasswordToFirebase(
        session.user.uid,
        userByFetchedDb.email,
        currentPassword,
        newPassword
      );
    }

    return NextResponse.json({ message: "パスワードが更新されました" }, { status: 200 });
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
