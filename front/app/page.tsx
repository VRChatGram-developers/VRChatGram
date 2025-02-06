import { Main } from "@/features/home/components/main";
import { fetchNotifications, fetchHomeFeed } from "@/features/home/endpoint";
import { Post } from "@/features/home/types/post";
import { Tag } from "@/features/home/types/tag";
export default async function Home() {
  const notifications = await fetchNotifications();
  const homeData = await fetchHomeFeed<{
    popularPostList: Post[];
    latestPosts: Post[];
    popularTagList: Tag[];
    latestPostListWithX: Post[];
  }>();
  const { popularPostList, latestPosts, popularTagList, latestPostListWithX } = homeData;

  console.log(notifications);
  console.log(`latestPosts`);
  console.log(latestPosts);
  return (
    <Main
      notifications={notifications}
      latestPosts={latestPosts}
      popularTagList={popularTagList}
      popularPostList={popularPostList}
      latestPostListWithX={latestPostListWithX}
    />
  );
}

