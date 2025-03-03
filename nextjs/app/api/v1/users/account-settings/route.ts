import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import {
  updatePassword,
  updateEmail,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

const changeEmail = async (newEmail: string, currentPassword: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("ユーザーがログインしていません");
    return;
  }

  try {
    // メールアドレスを更新
    await updateEmail(user, newEmail);
    console.log("メールアドレスが更新されました:", newEmail);
  } catch (error: any) {
    if (error.code === "auth/requires-recent-login") {
      console.log("再認証が必要です");

      // 現在のパスワードを使って再認証
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 再認証後に再度メールアドレス更新
      await updateEmail(user, newEmail);
      console.log("メールアドレスが更新されました:", newEmail);
    } else {
      console.error("メールアドレスの更新に失敗しました:", error);
    }
  }
};

export async function POST(request: Request) {
  try {
    await connect();
    const { email, currentPassword } = await request.json();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }
    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } catch (error) {
    console.error("パスワードの再認証に失敗しました:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  } finally {
    await prisma.$disconnect();
  }
}

const reauthenticateAndChangePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("ユーザーがログインしていません");
    return;
  }

  try {
    // 現在のパスワードで再認証
    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // 再認証が成功したらパスワードを変更
    await updatePassword(user, newPassword);
    console.log("パスワードを更新しました");
  } catch (error) {
    console.error("再認証またはパスワードの更新に失敗:", error);
  }
};

export async function GET() {
  try {
    await connect();

    const session = await getServerSession(authOptions);
    console.log(session);
    console.log(`session`);
    console.log(session);

    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    console.log(`session`);
    console.log(session);

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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const { email, show_sensitive_type, gender, currentPassword, newPassword } =
      await request.json();

    changeEmail(email, currentPassword);
    reauthenticateAndChangePassword(email, currentPassword, newPassword);

    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        show_sensitive_type: show_sensitive_type,
        gender: gender,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
