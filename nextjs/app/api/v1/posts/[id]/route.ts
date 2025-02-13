import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { toJson } from "@/utils/json";
import _ from "lodash";
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    const post = await prisma.posts.findUnique({
      where: { id: BigInt(id) },
      select: {
        id: true,
        title: true,
        view_count: true,
        description: true,
        images: true,
        tags: true,
        likes: true,
        booth_items: true,
        user: {
          select: {
            id: true,
            name: true,
            my_id: true,
            profile_url: true
          },
        },
      },
    });
    const postData = toJson(post);
    const likeCount = post?.likes.length;
    const tags = post?.tags.map(toJson);
    const booths = post?.booth_items.map(toJson);
    const images = post?.images.map(toJson);

    return NextResponse.json({
      id: postData?.id,
      title: postData?.title,
      viewCount: Number(postData?.view_count),
      description: postData?.description,
      likeCount: likeCount,
      tags: tags,
      booths: booths,
      images: images,
      user: toJson(postData?.user),
    });
  } catch (error) {
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}