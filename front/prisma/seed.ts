import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // テストデータの作

  // ユーザーの作成
  const users = await Promise.all([
    prisma.users.create({
      data: {
        name: "テストユーザー1",
        password: "password123",
        email: "test1@example.com",
        gender: "male",
        profile_url: "https://example.com/profile1.jpg",
        status: "active",
        birthday: new Date("1990-01-01"),
        my_id: "user1",
      },
    }),
    prisma.users.create({
      data: {
        name: "テストユーザー2",
        password: "password123",
        email: "test2@example.com",
        gender: "female",
        profile_url: "https://example.com/profile2.jpg",
        status: "active",
        birthday: new Date("1995-02-15"),
        my_id: "user2",
      },
    }),
  ]);

  // 投稿の作成
  const posts = await Promise.all([
    prisma.posts.create({
      data: {
        user_id: users[0].id,
        title: "最初の投稿",
        description: "これは最初のテスト投稿です。",
        images: {
          create: {
            url: "https://example.com/image1.jpg",
          },
        },
      },
    }),
    prisma.posts.create({
      data: {
        user_id: users[0].id,
        title: "2番目の投稿",
        description: "2番目のテスト投稿です。",
        images: {
          create: {
            url: "https://example.com/image2.jpg",
          },
        },
      },
    }),
    prisma.posts.create({
      data: {
        user_id: users[1].id,
        title: "ユーザー2の投稿",
        description: "ユーザー2による投稿です。",
        images: {
          create: {
            url: "https://example.com/image3.jpg",
          },
        },
      },
    }),
    prisma.posts.create({
      data: {
        user_id: users[1].id,
        title: "写真付き投稿",
        description: "写真を追加した投稿のテストです。",
        images: {
          create: {
            url: "https://example.com/image4.jpg",
          },
        },
      },
    }),
    prisma.posts.create({
      data: {
        user_id: users[0].id,
        title: "テスト投稿5",
        description: "5番目のテスト投稿です。",
        images: {
          create: {
            url: "https://example.com/image5.jpg",
          },
        },
      },
    }),
  ]);

  const likes = await Promise.all(
    posts.map((post) =>
      prisma.likes.create({
        data: {
          post_id: post.id,
          user_id: users[1].id, // ユーザー2が全ての投稿にいいねする場合
          posted_user_id: post.user_id,
        },
      })
    )
  );

  // 全ての投稿にランダムでタグ付けておく
  const tags = await Promise.all([
    prisma.tags.create({
      data: {
        name: "タグ1",
      },
    }),
    prisma.tags.create({
      data: {
        name: "タグ2",
      },
    }),
    prisma.tags.create({
      data: {
        name: "タグ3",
      },
    }),
  ]);

  await Promise.all(
    posts.flatMap((post) => [
      prisma.post_tags.create({
        data: {
          post_id: post.id,
          tag_id: tags[0].id, // 全ての投稿にタグ1を付ける
        },
      }),
      prisma.post_tags.create({
        data: {
          post_id: post.id,
          tag_id: tags[1].id, // 全ての投稿にタグ2を付ける
        },
      }),
    ])
  );

  // notificationsとnotification_typesの作成
  const notifications = await Promise.all([
    prisma.notifications.create({
      data: {
        title: "お知らせ1",
        content: "お知らせ1です",
        notification_type: "release",
        published_at: new Date(),
        user: {
          connect: { id: users[0].id },
        },
      },
    }),
    prisma.notifications.create({
      data: {
        title: "お知らせ2",
        content: "お知らせ2です",
        notification_type: "important",
        published_at: new Date(),
        user: {
          connect: { id: users[1].id },
        },
      },
    }),
  ]);

  console.log("Seed data created:", { users, posts, notifications, likes });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
