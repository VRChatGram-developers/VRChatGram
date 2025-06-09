import { NotificationDetail } from "@/features/notifications/components/notification-detail";
import { createClient } from "microcms-js-sdk";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
    apiKey: process.env.X_MICROCMS_API_KEY ?? "",
  });

  const notification = await client.get({ endpoint: "notifications", contentId: id });

  const year = new Date(notification.publishedAt).getFullYear();
  const month = String(new Date(notification.publishedAt).getMonth() + 1).padStart(2, "0"); // `01` 形式にする
  const day = String(new Date(notification.publishedAt).getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;
  const serializedNotification = {
    ...notification,
    publishedAt: formattedDate,
  };

  if (serializedNotification.publishedAt < new Date().toISOString()) {
    return null;
  }

  return <NotificationDetail notification={serializedNotification} />;
}
