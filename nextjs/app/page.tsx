import { fetchHomeFeed, fetchPopularTagListForHome } from "@/features/home/endpoint";
import {
  PopularPost as PopularPostType,
  LatestPost as LatestPostType,
  XPost as XPostType,
  Notification,
} from "@/features/home/types/index";
import { auth } from "@/libs/firebase/auth";
import { createClient } from "microcms-js-sdk";
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";

const PopularPostList = dynamic(() => import("@/features/home/components/popular-post-list"), {
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
    </div>
  ),
});

const LatestPost = dynamic(() => import("@/features/home/components/latest-post"), {
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
    </div>
  ),
});

const PopularTag = dynamic(() => import("@/features/home/components/popular-tag"), {
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
    </div>
  ),
});

const Main = dynamic(() => import("@/features/home/components/main"), {
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
    </div>
  ),
});

export const revalidate = 60;

export default async function Home() {
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: process.env.X_MICROCMS_API_KEY ?? "",
  });

  const session = await auth();

  const [popularTagList, homeData, notificationsData] = await Promise.all([
    fetchPopularTagListForHome(),
    fetchHomeFeed<{
      popularPostList: PopularPostType[];
      latestPostList: LatestPostType[];
      latestPostListWithX: XPostType[];
    }>(session),
    client.get({
      endpoint: "notifications",
      queries: { limit: 2, orders: "publishedAt" },
    }),
  ]);

  const notifications = notificationsData.contents
    .filter((notification: Notification) => notification.publishedAt < new Date().toISOString())
    .map((notification: Notification) => {
      return {
        ...notification,
      };
    });

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

  if (typeof homeData === "string") {
    return <div>{homeData}</div>;
  }
  if (typeof popularTagList === "string") {
    return <div>{popularTagList}</div>;
  }
  const { popularPostList, latestPostList } = homeData;
  const GoogleAd = dynamic(() => import("@/features/home/components/google-adsense"), {
    loading: () => (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
      </div>
    ),
  });

  const dataSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_DATA_SLOT_ID || "";

  return (
    <>
      <Main notifications={serializedNotifications} />
      {dataSlotId && (
        <GoogleAd slot={dataSlotId} style={{ width: "100%", height: "60px" }} responsive="true" />
      )}
      <PopularPostList popularPostList={popularPostList} />
      <PopularTag popularTagList={popularTagList} />
      <LatestPost latestPostList={latestPostList} />
    </>
  );
}
