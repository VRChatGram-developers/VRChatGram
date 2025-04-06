import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as authClient } from "@/libs/firebase/client";
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

const updatePasswordToFirebase = async (
  uid: string,
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  // 現在のパスワードを比較する
  const token = signInWithEmailAndPassword(authClient, email, currentPassword);

  if (!token) {
    return;
  }

  try {
    await updateUser(uid, {
      password: newPassword,
    });
    console.log("パスワードが更新されました:");
  } catch (error) {
    console.error("パスワードの更新に失敗しました:", error);
  }
};

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    let currentUser;
    if (session) {
      currentUser = await prisma.users.findUnique({
        where: {
          uid: session.user.uid,
        },
        select: {
          id: true,
          email: true,
          show_sensitive_type: true,
          gender: true,
        },
      });
    }

    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    const { email, show_sensitive_type, gender, currentPassword, newPassword } =
      await request.json();

    const userByFetchedDb = await prisma.users.findFirst({
      where: {
        uid: session.user.uid,
      },
    });

    // メールアドレスのパラメーターが存在または、DBとのメールアドレスを比較して変更があった場合、更新する
    if (email && userByFetchedDb?.email != email) {
      await updateEmailToFirebase(session.user.uid, email);
    }

    if (newPassword && currentPassword != newPassword) {
      await updatePasswordToFirebase(session.user.uid, email, currentPassword, newPassword);
    }

    const user = await prisma.users.update({
      where: {
        uid: session.user.uid,
      },
      data: {
        email: email,
        show_sensitive_type: show_sensitive_type,
        gender: gender,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    await prisma.users.update({
      where: {
        uid: session.user.uid,
      },
      data: {
        status: "deleted",
      },
    });

    return NextResponse.json("アカウントの削除に成功しました");
  } catch (error) {
    console.error("アカウントの削除に成功しましたに失敗しました:", error);
  }
}
