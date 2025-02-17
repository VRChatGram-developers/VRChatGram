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
        introduce: "テストユーザー1の自己紹介です。",
        social_links: {
          create: {
            platform_name: "twitter",
            platform_url: "https://twitter.com/user1",
          },
        },
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
        introduce: "テストユーザー2の自己紹介です。",
        social_links: {
          create: {
            platform_name: "twitter",
            platform_url: "https://twitter.com/user2",
          },
        },
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

  const tagPromises = Array.from({ length: 10 }, (_, i) =>
    prisma.tags.create({
      data: { name: `タグ${i + 1}` },
    })
  );
  const tags = await Promise.all(tagPromises); // ✅ Promise.all で並列処理

  const taggings = posts.map((post, i) =>
    prisma.post_tags.create({
      data: {
        post_id: post.id,
        tag_id: tags[i % tags.length].id, // ✅ `i % tags.length` で範囲外エラー防止
      },
    })
  );

  await Promise.all(taggings);

  await Promise.all(
    posts.map(async (post) => {
      const boothItem = await prisma.booth_items.create({
        data: {
          title: "booth_title_1",
          detail: "booth_detail_1",
          url: "https://example.com/booth_url_1",
          image: "https://example.com/booth_image_1",
        },
      });

      await prisma.post_booth_items.create({
        data: {
          post_id: post.id,
          booth_id: boothItem.id,
        },
      });
    })
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

  createUserAndPost().catch((error) => {
    console.error(error);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  const createUserAndPost = async () => {
    // ユーザーを作成
    const user = await prisma.users.create({
      data: {
        name: "テストユーザー榑林",
        password: "password123",
        email: "test1@example.com",
        gender: "male",
        profile_url: "https://example.com/profile1.jpg",
        status: "active",
        birthday: new Date("1990-01-01"),
        my_id: "kohei",
        introduce: "テストユーザー1の自己紹介です。",
        social_links: {
          create: {
            platform_name: "twitter",
            platform_url: "https://twitter.com/user1",
          },
        },
      },
    });
  
    // 投稿を作成
    const post = await prisma.posts.create({
      data: {
        user_id: user.id,
        title: "テスト投稿1",
        description: "テスト投稿1の説明です。",
      },
    });
  
    // 画像1を作成
    await prisma.post_images.create({
      data: {
        post_id: post.id,
        url: "https://images.vrcpic.com/photos/394/bc1b8c4b89151375fb0ab1bb0f6977e8.jpg",
      },
    });
  
    // 画像2を作成
    await prisma.post_images.create({
      data: {
        post_id: post.id,
        url: "https://images.vrcpic.com/photos/394/468f203d4a7221881e074343e835a513.jpg",
      },
    });
  
    // 画像3を作成
    await prisma.post_images.create({
      data: {
        post_id: post.id,
        url: "https://images.vrcpic.com/photos/394/4f3f8002e390b4abbe6da046ffaba5ff.jpg",
      },
    });
  
    // 画像4を作成
    await prisma.post_images.create({
      data: {
        post_id: post.id,
        url: "", // 画像が無い場合
      },
    });
  
    // タグを追加
    await prisma.post_tags.create({
      data: {
        post_id: post.id,
        tag_id: 1, // タグがあらかじめ用意されている前提
      },
    });
  };
  
  // 関数を実行
  createUserAndPost().catch((error) => {
    console.error(error);
  });
  