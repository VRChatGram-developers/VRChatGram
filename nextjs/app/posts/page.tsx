import { PostList } from "@/features/posts/components";
import { fetchPosts, fetchPopularTags } from "@/features/posts/endpoint";
import { headers } from "next/headers";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const queryParamsString = new URLSearchParams(params as Record<string, string>).toString();

  const postsList = await fetchPosts(queryParamsString, await headers());
  const popularTags = await fetchPopularTags();

  return <PostList posts={postsList} popularTags={popularTags} />;
}
