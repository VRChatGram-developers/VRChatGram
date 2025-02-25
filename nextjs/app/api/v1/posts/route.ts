export const runtime = 'edge';

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/libs/firebase/auth5";

//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
const connect = async () => {
  try {
    //prismaでデータベースに接続
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request) {
  try {
    await connect();

    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const { title, description, boothItems, images, tags, isSensitive } = await request.json();

    const user = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    // TODO　S3保存後、発行されや画像のurlを取得する
    const serializedImages = images.map(
      (image: { url: string; width: number; height: number }) => ({
        url: "https://example.com/image.jpg",
        width: image.width.toString(),
        height: image.height.toString(),
      })
    );

    await prisma.posts.create({
      data: {
        title: title,
        description: description,
        booth_items: {
          create: boothItems.map(
            (item: { url: string; name: string; detail: string; image: string }) => ({
              booth: {
                create: {
                  title: item.name,
                  url: item.url,
                  detail: item.detail,
                  image: item.image,
                },
              },
            })
          ),
        },
        images: {
          create: serializedImages,
        },
        tags: {
          create: tags.map((tag: string) => ({
            tag: {
              create: {
                name: tag,
              },
            },
          })),
        },
        is_sensitive: isSensitive,
        user_id: user.id,
      },
    });

    return NextResponse.json({ status: 200, message: "投稿に成功しました" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}
