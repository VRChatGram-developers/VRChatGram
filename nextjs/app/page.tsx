import { Main } from "@/features/home/components/main";
import { fetchHomeFeed, fetchPopularTagListForHome } from "@/features/home/endpoint";
import {
  PopularPost as PopularPostType,
  LatestPost as LatestPostType,
  XPost as XPostType,
  Notification,
} from "@/features/home/types/index";
import { auth } from "@/libs/firebase/auth";
import { createClient } from "microcms-js-sdk";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export const revalidate = 60;

export default async function Home() {
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: process.env.X_MICROCMS_API_KEY ?? "",
  });

  const response = await client.get({
    endpoint: "notifications",
    queries: { limit: 2, orders: "publishedAt" },
  });
  const notifications = response.contents.map((notification: Notification) => {
    return {
      ...notification,
    };
  });
  const session = await auth();
  const serializedNotifications = notifications.map((notification: Notification) => {
    const year = new Date(notification.publishedAt).getFullYear();
    const month = String(new Date(notification.publishedAt).getMonth() + 1).padStart(2, "0"); // `01` 形式にする
    const day = String(new Date(notification.publishedAt).getDate()).padStart(2, "0");
    const formattedDate = `${year}.${month}.${day}`;
    return {
      ...notification,
      publishedAt: formattedDate,
    };
  });

  const popularTagList = await fetchPopularTagListForHome();
  const homeData = await fetchHomeFeed<{
    popularPostList: PopularPostType[];
    latestPostList: LatestPostType[];
    latestPostListWithX: XPostType[];
  }>(session);
  if (typeof homeData === "string") {
    return <div>{homeData}</div>;
  }
  if (typeof popularTagList === "string") {
    return <div>{popularTagList}</div>;
  }
  const { popularPostList, latestPostList, latestPostListWithX } = homeData;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      }
    >
      <Main
        notifications={serializedNotifications}
        latestPostList={latestPostList}
        popularTagList={popularTagList}
        popularPostList={popularPostList}
        latestPostListWithX={latestPostListWithX}
      />
    </Suspense>
  );
}
