import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../api/auth/[...nextauth]/route";
import { S3Service } from "../../services/s3-service";

//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
  try {
    //prismaでデータベースに接続
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

const uploadImages = async (
  images: { file_data: string; file_name: string; width: number; height: number }[]
) => {
  const s3Service = new S3Service();
  return await Promise.all(
    images.map(
      async (image: { file_data: string; file_name: string; width: number; height: number }) => {
        const url = await s3Service.uploadFileToS3(image.file_data, image.file_name);
        return { url: url, width: image.width, height: image.height };
      }
    )
  );
};

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
    await connect();

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

    const serializedImages = await uploadImages(images);
    const filteredTags = tags.filter((tag: string) => tag !== undefined && tag !== null);

    await prisma.posts.create({
      data: {
        title: title,
        description: description,
        booth_items: {
          create: formatBoothItems(boothItems),
        },
        images: {
          create: serializedImages,
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
    console.log(error.stack);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}
