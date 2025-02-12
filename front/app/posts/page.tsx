import { Posts } from "@/features/posts/components";
import { fetchPosts, fetchPopularTags } from "@/features/posts/endpoint";
export default async function Page() {
  const posts = await fetchPosts({ query: "1", page: 1 });
  const popularTags = await fetchPopularTags();
  return <Posts posts={posts} popularTags={popularTags} />;
}
