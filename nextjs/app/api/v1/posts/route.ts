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

    // 既に存在するタグを取得
    const fetchRegisteredTags = await prisma.tags.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    const filteredTags = tags.filter((tag: string) => tag !== undefined && tag !== null);

    await prisma.$transaction(async (tx) => {
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

      const tagsToCreate = await Promise.all(
        filteredTags.map(async (tag: string) => {
          const existingTag = fetchRegisteredTags.find((t) => t.name === tag);
          if (!existingTag) {
            const newTag = await tx.tags.create({
              data: {
                name: tag,
              },
            });
            return newTag;
          }
          return existingTag;
        })
      );

      await Promise.all(
        tagsToCreate.map(
          async (tag: { id: string; name: string; created_at: Date; updated_at: Date }) => {
            await tx.post_tags.create({
              data: {
                post_id: post.id,
                tag_id: tag.id,
              },
            });
          }
        )
      );
    });

    return NextResponse.json({ status: 200, message: "投稿に成功しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}
