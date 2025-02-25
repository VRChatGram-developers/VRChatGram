export const runtime = "edge";

import { PostDetail } from "@/features/posts/components";
import { fetchPostById } from "@/features/posts/endpoint";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPostById(id);
  console.log(post);
  return <PostDetail post={post} />;
}
