import { PostDetail } from "@/features/posts/components";
import { fetchPostById, addViewCountToPost } from "@/features/posts/endpoint";
import { headers } from "next/headers";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await addViewCountToPost(id, new Headers(await headers()));
  const post = await fetchPostById(id, new Headers(await headers()));
  if (typeof post === "string") {
    return <div>{post}</div>;
  }
  return <PostDetail post={post} />;
}
