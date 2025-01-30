import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connect();
    const test = await prisma.tests.findUnique({ where: { id: parseInt(id) } });
    return NextResponse.json({ test });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, content } = await request.json();
  try {
    await connect();
    await prisma.tests.update({ where: { id: parseInt(id) }, data: { name, content } });
    return NextResponse.json({ message: "テスト更新成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connect();
    await prisma.tests.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "テスト削除成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}