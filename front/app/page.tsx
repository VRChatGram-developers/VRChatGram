import { Main } from "@/features/home/components/main";
import { fetchNotifications, fetchLatestPosts } from "@/features/home/endpoint";
export default async function Home() {
  const notifications = await fetchNotifications();
  const latestPosts = await fetchLatestPosts();
  console.log(notifications);
  console.log(`latestPosts`);
  console.log(latestPosts);
  return <Main notifications={notifications} latestPosts={latestPosts} />;
}

