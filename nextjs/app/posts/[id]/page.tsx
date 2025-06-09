import {
  fetchPostById,
  fetchOtherPostList,
  fetchRecommendPostList,
} from "@/features/posts/endpoint";
import { headers } from "next/headers";
import dynamic from "next/dynamic";

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
