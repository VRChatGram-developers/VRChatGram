import { Main } from "@/features/home/components/main";
import { fetchNotifications, fetchHomeFeed } from "@/features/home/endpoint";
import { Post } from "@/features/home/types/post";
import { Tag } from "@/features/home/types/tag";
import { PopularPost as PopularPostType, LatestPost as LatestPostType  } from "@/features/home/types/index";
export default async function Home() {
  const notifications = await fetchNotifications();
  const serializedNotifications = notifications.notifications.map((notification) => {
    const year = new Date(notification.published_at).getFullYear();
    const month = String(new Date(notification.published_at).getMonth() + 1).padStart(2, "0"); // `01` 形式にする
    const day = String(new Date(notification.published_at).getDate()).padStart(2, "0");
    const formattedDate = `${year}.${month}.${day}`;
    return {
      ...notification,
      published_at: formattedDate,
    };
  });
  const homeData = await fetchHomeFeed<{
    popularPostList: PopularPostType[];
    latestPosts: LatestPostType[];
    popularTagList: Tag[];
    latestPostListWithX: Post[];
  }>();
  const { popularPostList, latestPosts, popularTagList, latestPostListWithX } = homeData;

  return (
    <Main
      notifications={serializedNotifications}
      latestPosts={latestPosts}
      popularTagList={popularTagList}
      popularPostList={popularPostList}
      latestPostListWithX={latestPostListWithX}
    />
  );
}

