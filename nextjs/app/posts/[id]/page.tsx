import {
  fetchPostById,
  fetchOtherPostList,
  fetchRecommendPostList,
} from "@/features/posts/endpoint";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id, new Headers(await headers()));

  if (typeof post === "string") {
    return {
      title: "投稿が見つかりません",
      description: "投稿が見つかりません",
      keywords: [],
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title}`,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/posts/${id}`,
      images: [
        {
          url: post.images[0].url.endsWith(".mp4") ? "/video-thumbnail.png" : post.images[0].url,
          width: 1280,
          height: 720,
        },
      ],
      locale: "ja_JP",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title}`,
      description: post.description,
      images: [
        {
          url: post.images[0].url.endsWith(".mp4") ? "/video-thumbnail.png" : post.images[0].url,
          width: 1280,
          height: 720,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const PostDetail = dynamic(() =>
    import("@/features/posts/components/detail/post-detail").then((mod) => mod.PostDetail)
  );

  const [post, { otherPostList }, { recommendPostList }] = await Promise.all([
    fetchPostById(id, new Headers(await headers())),
    fetchOtherPostList(id, new Headers(await headers())),
    fetchRecommendPostList(id, new Headers(await headers())),
  ]);
  if (
    typeof post === "string" ||
    typeof otherPostList === "string" ||
    typeof recommendPostList === "string"
  ) {
    return <div>{post || otherPostList || recommendPostList}</div>;
  }
  return (
    <PostDetail post={post} otherPostList={otherPostList} recommendPostList={recommendPostList} />
  );
}
