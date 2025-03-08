import { PostDetail } from "@/features/posts/components";
import { fetchPostById } from "@/features/posts/endpoint";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPostById(id);
  if (typeof post === "string") {
    return <div>{post}</div>;
  }
  return <PostDetail post={post} />;
}
