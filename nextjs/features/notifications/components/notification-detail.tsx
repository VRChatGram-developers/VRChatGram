"use client";

import { Notification } from "@/features/home/types/index";
import styles from "../styles/notifications-detail.module.scss";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";

export const NotificationDetail = ({ notification }: { notification: Notification }) => {
  const router = useRouter();
  return (
    <div className={styles.notificationDetailContainer}>
      <div className={styles.notificationDetailContentContainer}>
        <div className={styles.notificationDetailTypeContainer}>
          <div>{notification.notification_type}</div>
          <div>{notification.publishedAt}</div>
        </div>
        <div className={styles.notificationDetailTitle}>{notification.title}</div>
        <div className={styles.notificationDetailContentText}>{parse(notification.content)}</div>
        <div className={styles.notificationDetailBackButton} onClick={() => router.back()}>
          一覧へ戻る
        </div>
      </div>
    </div>
  );
};
