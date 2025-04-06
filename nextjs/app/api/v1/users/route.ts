import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

const formatBirthdayToJST = (year: number, month: number, day: number): Date => {
  const jstDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0));
  return jstDate;
};

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      gender,
      profile_url,
      uid,
      my_id,
      birthday: { year, month, day },
    } = await request.json();

    const formattedBirthday = formatBirthdayToJST(year, month, day);

    await prisma.users.create({
      data: {
        name: name,
        email: email,
        gender: gender,
        profile_url: profile_url,
        status: "active",
        birthday: formattedBirthday,
        my_id: my_id,
        show_sensitive_type: "default",
        uid: uid,
      },
    });

    return NextResponse.json({ message: "ユーザー作成しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB接続失敗しました" }, { status: 500 });
  }
}
