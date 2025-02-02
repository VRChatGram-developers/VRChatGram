import { Main } from "@/features/home/components/main";
import { fetchNotifications } from "@/features/home/endpoint";
export default async function Home() {
  const notifications = await fetchNotifications();
  console.log(notifications);
  return <Main notifications={notifications} />;
}

