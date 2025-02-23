import { PostDetail } from "@/features/posts/components";
import { fetchPostById } from "@/features/posts/endpoint";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("params:", params);
  const { id } = await params;
  const postDetail = await fetchPostById(id);
  if (!postDetail) {
    return <div>Post not found</div>;
  }
  return <PostDetail post={postDetail} />;
  // console.log(post);
  // return <div>test</div>;
}


