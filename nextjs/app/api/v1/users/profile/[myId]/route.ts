import { NextResponse } from "next/server";

import { toJson } from "@/utils/json";
import _ from "lodash";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";
import { platform_types } from "@prisma/client";
import { SocialLink } from "@/features/users/types";

export const runtime = "edge";

const formatUpdateSocialLink = (social_links: SocialLink[]) => {
  return social_links.map((social_link) => {
    return {
      id: social_link.id,
      platform_types: social_link.platform_types,
      platform_url: social_link.platform_url,
    };
  });
};

const generateNumericUUID = () => {
  const sectionLengths = [8, 4, 4, 4, 12];

  return sectionLengths
    .map((len) => Array.from({ length: len }, () => Math.floor(Math.random() * 9) + 1).join(""))
    .join("-");
}

export async function PUT(request: Request, { params }: { params: Promise<{ myId: string }> }) {
  try {
    const { myId } = await params;
    if (!myId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしていません" }, { status: 401 });
    }

    const {
      introduction_title,
      introduction_detail,
      profile_image,
      header_image,
      social_links,
      name,
    } = await request.json();

    const userHasId = await prisma.users.findFirstOrThrow({
      where: { my_id: myId },
      select: {
        id: true,
      },
    });

    // 更新データを組み立て（undefined な画像は含めない）
    const updatedUserData: Record<string, unknown> = {
      introduction_title: introduction_title,
      introduction_detail: introduction_detail,
      name: name,
    };

    if (profile_image?.url) {
      updatedUserData.profile_url = profile_image.url;
    }

    if (header_image?.url) {
      updatedUserData.header_url = header_image.url;
    }

    // ユーザープロフィールを更新
    await prisma.users.update({
      where: { id: userHasId.id },
      data: updatedUserData,
    });

    await Promise.all(
      formatUpdateSocialLink(social_links).map((link) =>
        prisma.social_links.upsert({
          where: { id: link.id || "" },
          update: {
            platform_types: link.platform_types as platform_types,
            platform_url: link.platform_url,
          },
          create: {
            user_id: userHasId.id,
            platform_types: link.platform_types as platform_types,
            platform_url: link.platform_url,
          },
        })
      )
    );

    return NextResponse.json({ message: "更新しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ myId: string }> }) {
  try {
    const { myId } = await params;
    if (!myId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
    let currentUser = null;
    if (session) {
      currentUser = await prisma.users.findUnique({
        where: {
          uid: session.user.uid,
        },
        select: {
          id: true,
        },
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        my_id: myId
      },
      select: {
        id: true,
        name: true,
        introduction_title: true,
        introduction_detail: true,
        uid: true,
        profile_url: true,
        header_url: true,
        my_id: true,
        following: {
          select: {
            follower_id: true,
          },
        },
        posts: {
          where: {
            deleted_at: null,
          },
          select: {
            id: true,
            title: true,
            show_sensitive_type: true,
            view_count: true,
            images: {
              select: {
                id: true,
                url: true,
                width: true,
                height: true,
              },
            },
            likes: {
              select: {
                id: true,
                user_id: true,
              },
            },
          },
        },
        social_links: {
          select: {
            id: true,
            platform_types: true,
            platform_url: true,
          },
        },
      },
    });

    const isBlocked = !!(await prisma.block_users.findFirst({
      where: {
        blocker_user_id: currentUser?.id,
        blocked_user_id: user?.id,
      },
    }));

    const isCurrentUser = currentUser?.id === user?.id;
    const postsWithLikes =
      user?.posts.map((post) => ({
        ...toJson(post),
        likesCount: post.likes.length,
        images: post.images.map(toJson),
        isLiked: post.likes.some((like) => like.user_id == currentUser?.id),
      })) || [];

    if (user?.social_links.length === 0) {
      [
        platform_types.x,
        platform_types.discord,
        platform_types.vrchat,
        platform_types.other,
        platform_types.other,
      ].forEach(async (platform_types) => {
        user?.social_links.push({
          id: generateNumericUUID(),
          platform_types: platform_types,
          platform_url: "",
        });
      });
    }

    const totalLikes = postsWithLikes.reduce((total, post) => total + post.likesCount, 0);
    const top4Posts = postsWithLikes.sort((a, b) => b.likesCount - a.likesCount).slice(0, 4);
    const totalViews = postsWithLikes.reduce((total, post) => total + post.view_count, 0);
    const chunkedPostsWithLikes = _.chunk(postsWithLikes, 20);
    const isFollowedByAccount = Boolean(
      user?.following.find((follower_user) => follower_user?.follower_id === currentUser?.id)
    );

    const response = {
      id: toJson(user?.id),
      name: user?.name,
      my_id: user?.my_id,
      introduction_title: user?.introduction_title,
      introduction_detail: user?.introduction_detail,
      profile_url: user?.profile_url,
      header_url: user?.header_url,
      posts: chunkedPostsWithLikes,
      totalLikes: totalLikes,
      top4Posts: top4Posts,
      totalViews: totalViews,
      isCurrentUser: isCurrentUser,
      social_links: user?.social_links.map(toJson),
      isFollowedByAccount: isFollowedByAccount,
      isBlocked: isBlocked,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
