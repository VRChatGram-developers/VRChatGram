import { FavoritePostList } from "@/features/users/components/favorite-post-list";
import { fetchMyLikePostList } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page() {
  const postList = await fetchMyLikePostList(new Headers(await headers()));
  if (typeof postList === "string") {
    return <div>{postList}</div>;
  }
  return <FavoritePostList favoritePostList={postList} />;
}
