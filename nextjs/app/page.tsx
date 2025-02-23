import { Main } from "@/features/home/components/main";
import { fetchNotifications, fetchHomeFeed } from "@/features/home/endpoint";
import { Tag } from "@/features/home/types/tag";
import { PopularPost as PopularPostType, LatestPost as LatestPostType, XPost as XPostType } from "@/features/home/types/index";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/firebase/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);
  const notifications = await fetchNotifications();

  console.log("Notifications:", notifications);
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
    latestPostList: LatestPostType[];
    popularTagList: Tag[];
    latestPostListWithX: XPostType[];
  }>(session);

  console.log("HomeData:", homeData);
  const { popularPostList, latestPostList, popularTagList, latestPostListWithX } = homeData;

  return (
    <Main
      notifications={serializedNotifications}
      latestPostList={latestPostList}
      popularTagList={popularTagList}
      popularPostList={popularPostList}
      latestPostListWithX={latestPostListWithX}
    />
  );
}

