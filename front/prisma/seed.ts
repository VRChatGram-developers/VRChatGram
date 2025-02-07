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

  const posts = [];
  for (let i = 0; i < 15; i++) {
    const post = await prisma.posts.create({
      data: {
        user_id: users[0].id,
        title: `テスト投稿${i + 1}`,
        description: `テスト投稿${i + 1}の説明です。`,
        images: {
          create: {
            url: `https://example.com/image${i + 1}.jpg`,
          },
        },
      },
    });
    posts.push(post);
  }

  const xPosts = [];
  for (let i = 0; i < 15; i++) {
    const post = await prisma.posts.create({
      data: {
        user_id: users[0].id,
        title: `テスト投稿${i + 1}`,
        description: `テスト投稿${i + 1}の説明です。`,
        images: {
          create: {
            url: `https://example.com/image${i + 1}.jpg`,
          },
        },
        is_posted_x: true,
      },
    });
    xPosts.push(post);
  }

  // 投稿の作成
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
  const tagPromises = Array.from({ length: 10 }, (_, i) =>
    prisma.tags.create({
      data: { name: `タグ${i + 1}` },
    })
  );
  const tags = await Promise.all(tagPromises); // ✅ Promise.all で並列処理
  
  // 🔹 ② 全ての投稿にランダムでタグを付与
  const taggings = posts.map((post, i) =>
    prisma.post_tags.create({
      data: {
        post_id: post.id,
        tag_id: tags[i % tags.length].id, // ✅ `i % tags.length` で範囲外エラー防止
      },
    })
  );
  
  await Promise.all(taggings); 

  

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
