import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
export const runtime = "edge";

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

export async function GET() {
  try {
    await connect();
    const notifications = await prisma.notifications.findMany({
      orderBy: {
        published_at: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        notification_type: true,
        published_at: true,
      },
    });
    // BigIntをnumberに変換
    const serializedNotifications = notifications.map((notification) => ({
      ...notification,
      id: notification.id.toString(),
      published_at: notification.published_at.toISOString(),
    }));

    return NextResponse.json({ notifications: serializedNotifications });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
