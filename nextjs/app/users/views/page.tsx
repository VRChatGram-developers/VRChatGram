import { ViewPostList } from "@/features/users/components/view-post-list";
import { fetchMyViewsPosts } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page() {
  const postList = await fetchMyViewsPosts(new Headers(await headers()));
  if (typeof postList === "string") {
    return <div>{postList}</div>;
  }
  return <ViewPostList viewsPostList={postList} />;
}
