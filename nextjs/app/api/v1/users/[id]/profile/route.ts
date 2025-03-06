import { NextResponse } from "next/server";

import { platform_types, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { S3Service } from "@/app/api/services/s3-service";
import { SocialLink } from "@/features/users/types";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export const formatUpdateSocialLink = (social_links: SocialLink[]) => {
  return social_links.map((social_link) => {
    return {
      id: social_link.id,
      platform_types: social_link.platform_types,
      platform_url: social_link.platform_url,
    };
  });
};

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
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

    const s3Service = new S3Service();
    const profileImageUrl = await s3Service.uploadFileToS3(
      profile_image.file_data,
      profile_image.file_name
    );
    const headerImageUrl = await s3Service.uploadFileToS3(
      header_image.file_data,
      header_image.file_name
    );

    await prisma.users.update({
      where: { id: id },
      data: {
        introduction_title: introduction_title,
        introduction_detail: introduction_detail,
        profile_url: profileImageUrl,
        header_url: headerImageUrl,
        name: name,
      },
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
            user_id: id,
            platform_types: link.platform_types as platform_types,
            platform_url: link.platform_url,
          },
        })
      )
    );

    return NextResponse.json({ message: "更新しました" }, { status: 200 });
  } catch (error) {
    console.log(`error`);
    console.log(error.stack);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
