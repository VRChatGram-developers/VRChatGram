import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }
    const user = await prisma.users.findFirstOrThrow({ where: { uid: session?.user.uid } });
    const views = await prisma.views.findFirst({
      where: { user_id: user.id },
      
      select: {
        id: true,
        post: {
          select: {
            id: true,
            title: true,
            images: true,
            tags: true,
            description: true,
            created_at: true,
            updated_at: true,
            view_count: true,
            like_count: true,
            comment_count: true,
          },
        },
      },
    });

    if (!views) {
      await prisma.views.create({ data: { user_id: user.id } });
    }

    return NextResponse.json({ message: "閲覧しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
