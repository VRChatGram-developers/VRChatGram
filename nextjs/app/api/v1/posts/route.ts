import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "nodejs";

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

    const tagsToCreate = await Promise.all(
      filteredTags.map(async (tag: string) => {
        return prisma.tags.upsert({
          where: { name: tag },
          update: {}, // 既にあれば何もしない
          create: { name: tag }, // なければ作成
        });
      })
    );

    const tagLinks = tagsToCreate.map((tag) => ({
      tag_id: tag.id,
    }));

    await prisma.$transaction(
      async (tx) => {
        try {
          const post = await tx.posts.create({
            data: {
              title: title,
              description: description,
              booth_items: {
                create: formatBoothItems(boothItems),
              },
              images: {
                create: images,
              },
              show_sensitive_type: show_sensitive_type,
              user_id: user.id,
            },
          });

          for (const link of tagLinks) {
            await tx.post_tags.create({
              data: {
                post_id: post.id,
                tag_id: link.tag_id,
              },
            });
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        maxWait: 10000,
        timeout: 60000,
      }
    );

    return NextResponse.json({ status: 200, message: "投稿に成功しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}
