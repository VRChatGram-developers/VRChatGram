export const runtime = 'edge';

import { PostList } from "@/features/posts/components";
import { fetchPosts, fetchPopularTags } from "@/features/posts/endpoint";
import { headers } from "next/headers";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // paramsをRecord<string, string>に変換
  const queryParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value || "",
    ])
  );

  const queryParamsString = new URLSearchParams(queryParams).toString();
  const postsList = await fetchPosts(queryParamsString, await headers());
  const popularTags = await fetchPopularTags();

  return <PostList posts={postsList} popularTags={popularTags} />;
}
