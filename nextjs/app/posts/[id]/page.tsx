import { PostDetail } from "@/features/posts/components";
import { fetchPostById } from "@/features/posts/endpoint";

export const runtime = "edge";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetchPostById(id);
  console.log(post);
  return <PostDetail post={post} />;
}
