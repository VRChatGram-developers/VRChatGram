import { NextResponse } from "next/server";

import { bigIntToStringMap } from "@/utils/bigIntToStringMapper";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";
import { PostRepositoryImpl } from "@/app/api/repository/post-repository-impl";
import { PostServiceImpl } from "@/app/api/services/post-service-impl";
import { UserRepositoryImpl } from "@/app/api/repository/user-repository-impl";

export const runtime = "nodejs";

type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const updateOrCreatePostTags = async (tags: { tag_id: string }[], postId: string) => {
  await prisma.post_tags.deleteMany({ where: { post_id: postId } });
  await prisma.post_tags.createMany({
    data: tags.map((tag) => ({ post_id: postId, tag_id: tag.tag_id })),
  });
};

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
    const session = await auth();
    const user = session
      ? await prisma.users.findFirst({ where: { uid: session?.user.uid } })
      : null;

    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId, deleted_at: null },
      select: {
        id: true,
        title: true,
        view_count: true,
        description: true,
        show_sensitive_type: true,
        images: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        post_photo_types: {
          select: {
            photo_type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        likes: true,
        booth_items: {
          include: {
            booth: {
              select: {
                id: true,
                title: true,
                detail: true,
                image: true,
                url: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            my_id: true,
            profile_url: true,
            social_links: {
              select: {
                platform_types: true,
                platform_url: true,
              },
            },
          },
        },
      },
    });

    const { likes, ...postData } = post;
    const isLiked = likes.some((like) => like.user_id === user?.id);
    const serializedPost = bigIntToStringMap(postData);
    const likeCount = likes?.length ?? 0;

    const isMyPost = post.user.my_id === user?.my_id;

    return NextResponse.json({
      ...serializedPost,
      likeCount,
      isLiked,
      isMyPost,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const { title, description, boothItems, images, tags, show_sensitive_type, photo_types } =
      await request.json();

    const user = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const photoTypes = await prisma.photoTypes.findMany({
      where: {
        id: { in: photo_types },
      },
    });

    const filteredTags = tags.filter((tag: string) => tag !== undefined && tag !== null);

    const tagsToCreate = await Promise.all(
      filteredTags.map(async (tag: string) => {
        return prisma.tags.upsert({
          where: { name: tag },
          update: {}, // 既にあれば何もしない
          create: { name: tag }, // なければ作成
        });
      })
    );

    const tagLinks = tagsToCreate.map((tag) => ({
      tag_id: tag.id,
    }));

    const booths = await Promise.all(
      boothItems.map(
        (item: { id: string; name: string; detail: string; url: string; image: string }) =>
          prisma.booth_items.upsert({
            where: { id: item.id },
            update: {
              title: item.name,
              detail: item.detail,
              url: item.url,
              image: item.image,
            },
            create: {
              title: item.name,
              url: item.url,
              detail: item.detail,
              image: item.image,
            },
          })
      )
    );

    const post = await prisma.posts.update({
      where: { id: postId },
      data: {
        title: title,
        description: description,
        images: {
          deleteMany: {
            id: {
              notIn: images.map((image: Image) => image.id),
            },
          },
          upsert: images.map((image: Image) => ({
            where: { id: image.id },
            update: { url: image.url },
            create: { url: image.url, width: image.width, height: image.height },
          })),
        },
        post_photo_types: {
          deleteMany: {},

          // 2. 選択されたIDに基づいて新しい関連を作成
          create: photoTypes.map((photoType: { id: string }) => ({
            photo_type_id: photoType.id,
          })),
        },
        show_sensitive_type: show_sensitive_type,
        user_id: user.id,
      },
    });

    await updateOrCreatePostTags(tagLinks, post.id);
    await prisma.post_booth_items.deleteMany({ where: { post_id: postId } });
    await prisma.post_booth_items.createMany({
      data: booths.map((booth) => ({
        post_id: postId,
        booth_id: booth.id,
      })),
    });

    return NextResponse.json({ status: 200, message: "投稿に成功しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const postService = new PostServiceImpl(
      new PostRepositoryImpl(),
      new UserRepositoryImpl()
    );
    const result = await postService.deletePostAndRelatedData(postId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "投稿の削除に失敗しました" }, { status: 500 });
  }
}