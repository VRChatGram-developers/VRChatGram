import { NextResponse } from 'next/server'

import { PrismaClient } from "@prisma/client";

//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
    try {
        //prismaでデータベースに接続
        prisma.$connect();
    } catch (error) {
        return new Error(`DB接続失敗しました: ${error}`)
    }
}

export async function GET() {
  try {
    await connect()
    const tests = await prisma.tests.findMany()
    return NextResponse.json({ tests })
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
