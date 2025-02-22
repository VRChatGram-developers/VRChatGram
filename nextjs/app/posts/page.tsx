import { PostList } from "@/features/posts/components";
import { fetchPosts, fetchPopularTags } from "@/features/posts/endpoint";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const queryParamsString = new URLSearchParams(params).toString();

  const postsList = await fetchPosts(queryParamsString);
  const popularTags = await fetchPopularTags();

  return <PostList posts={postsList} popularTags={popularTags} />;
}
