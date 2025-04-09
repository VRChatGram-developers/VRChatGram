import { MyViewsPosts } from "@/features/users/components/my-views-posts";
import { fetchMyViewsPosts } from "@/features/users/endpoint";
import { headers } from "next/headers";
export default async function Page() {
  const postList = await fetchMyViewsPosts(new Headers(await headers()));
  if (typeof postList === "string") {
    return <div>{postList}</div>;
  }
  console.log(`postList`);
  console.log(postList);
  return <MyViewsPosts viewsPostList={postList} />;
}
