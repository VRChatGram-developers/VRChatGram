import { FavoritePostList } from "@/features/users/components/favorite-post-list";
import { fetchMyLikePostList } from "@/features/users/endpoint";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function Page() {
  const postList = await fetchMyLikePostList(new Headers(await headers()));
  if (typeof postList === "string") {
    return <div>{postList}</div>;
  }
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
      </div>
    }>
      <FavoritePostList favoritePostList={postList} />
    </Suspense>
  );
}
