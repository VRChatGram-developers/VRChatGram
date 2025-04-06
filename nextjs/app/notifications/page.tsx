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
  const perPage = 10;

  // 現在の日付を事前に取得して再利用
  const currentDateISOString = new Date().toISOString();

  // すべての通知を取得して、公開日が過ぎているものをカウント
  const totalData = await client.get({ endpoint: "notifications", queries: { limit: 0 } });
  const totalCount = totalData.contents.filter(
    (notification: Notification) => notification.publishedAt < currentDateISOString
  ).length;

  // ページ数の計算（totalCount が 0 の場合でも1ページにする）
  const totalPages = Math.ceil(totalCount > 0 ? totalCount / perPage : 1);

  // ページのオフセットとリミットを計算
  const offset = (currentPage - 1) * perPage;
  const limit = perPage;

  // 次に、現在のページの通知を取得
  const response = await client.get({
    endpoint: "notifications",
    queries: { offset, limit, orders: "publishedAt" },
  });

  // 公開日が過ぎていない通知をフィルタリング
  const notifications = response.contents.filter(
    (notification: Notification) => notification.publishedAt > currentDateISOString
  );

  // 日付のフォーマット
  const serializedNotifications = notifications.map((notification: Notification) => {
    const formattedDate = new Date(notification.publishedAt).toISOString().split("T")[0]; // `YYYY-MM-DD`形式に
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
