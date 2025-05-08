import { PostDetail } from "@/features/posts/components";
import { fetchPostById, addViewCountToPost } from "@/features/posts/endpoint";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await addViewCountToPost(id, new Headers(await headers()));
  const post = await fetchPostById(id, new Headers(await headers()));
  if (typeof post === "string") {
    return <div>{post}</div>;
  }
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
      </div>
    }>
      <PostDetail post={post} />
    </Suspense>
  );
}