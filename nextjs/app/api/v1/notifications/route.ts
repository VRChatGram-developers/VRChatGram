import { NextResponse } from "next/server";

import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET() {
  try {
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
    console.error(error);
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
