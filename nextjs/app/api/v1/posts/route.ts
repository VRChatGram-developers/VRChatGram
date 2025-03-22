import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

const formatBoothItems = (
  boothItems: { url: string; name: string; detail: string; image: string }[]
) => {
  return boothItems
    .filter((item) => item !== undefined && item !== null)
    .map((item) => ({
      booth: {
        create: {
          title: item.name,
          url: item.url,
          detail: item.detail,
          image: item.image,
        },
      },
    }));
};

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const { title, description, boothItems, images, tags, show_sensitive_type } =
      await request.json();

    const user = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const filteredTags = tags.filter((tag: string) => tag !== undefined && tag !== null);

    await prisma.posts.create({
      data: {
        title: title,
        description: description,
        booth_items: {
          create: formatBoothItems(boothItems),
        },
        images: {
          create: images,
        },
        tags: {
          create: filteredTags.map((tag: string) => ({
            tag: {
              create: {
                name: tag,
              },
            },
          })),
        },
        show_sensitive_type: show_sensitive_type,
        user_id: user.id,
      },
    });

    return NextResponse.json({ status: 200, message: "投稿に成功しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}
