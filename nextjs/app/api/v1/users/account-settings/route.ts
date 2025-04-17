import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

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

    const { show_sensitive_type, gender } = await request.json();

    const user = await prisma.users.update({
      where: {
        uid: session.user.uid,
      },
      data: {
        show_sensitive_type: show_sensitive_type,
        gender: gender,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE() {
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
