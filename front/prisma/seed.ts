import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ユーザーを作成
  const test1 = await prisma.tests.create(
    {
    data: {
        name: 'テスト1',
        content: 'テストデータ1です',
        },
    }
    );

  const test2 = await prisma.tests.create({
    data: {
      name: 'テスト2',
      content: 'テストデータ2です',
    },
  });

  console.log('Test data created:', { test1, test2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
