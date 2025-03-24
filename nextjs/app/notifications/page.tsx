import { NotificationsList } from "@/features/notifications/components/notifications-list";
import { createClient } from "microcms-js-sdk";
import { Notification } from "@/features/notifications/type/index";

export default async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const params = await searchParams;
  const page = params.page || "1";
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: process.env.X_MICROCMS_API_KEY ?? "",
  });

  const currentPage = parseInt(page) || 1;
  const totalCount = await client.get({ endpoint: "notifications", queries: { limit: 0 } });
  const perPage = 10;
  const totalPages = Math.ceil(totalCount.totalCount / perPage);
  const offset = (currentPage - 1) * perPage;
  const limit = perPage * currentPage;

  const response = await client.get({ endpoint: "notifications", queries: { offset, limit } });
  const notifications = response.contents.map((notification: Notification) => {
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
  return (
    <NotificationsList
      notifications={serializedNotifications}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
