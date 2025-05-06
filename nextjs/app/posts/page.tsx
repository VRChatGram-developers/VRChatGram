import { PostList } from "@/features/posts/components";
import { fetchPosts, fetchPopularTagList } from "@/features/posts/endpoint";
import { headers } from "next/headers";
import { Tag } from "@/features/posts/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const queryParamsString = new URLSearchParams(params as Record<string, string>).toString();

  const postsList = await fetchPosts(queryParamsString, new Headers(await headers()));
  const popularTags = await fetchPopularTagList();
  const rawTagName = params.tag as string;
  const tagName = `${rawTagName}` ? decodeURIComponent(`${rawTagName}`) : "ALL";

  if (typeof postsList === "string") {
    return <div>{postsList}</div>;
  }
  if (typeof popularTags === "string") {
    return <div>{popularTags}</div>;
  }

  const popularTagsWithHash = popularTags.map((tag: Tag) => ({
    ...tag,
    tag: { ...tag.tag, name: `#${tag.tag.name}` },
  }));

  return <PostList posts={postsList} popularTags={popularTagsWithHash} tagName={`#${tagName}`} />;
}
