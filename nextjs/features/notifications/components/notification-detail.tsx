"use client";

import { Notification } from "@/features/home/types/index";
import styles from "../styles/notifications-detail.module.scss";
import parse from "html-react-parser";
import Link from "next/link";

export const NotificationDetail = ({ notification }: { notification: Notification }) => {

  const getNotificationTypeClassName = (notificationType: string) => {
    const functionMap: Record<string, string> = {
      バグ修正: styles.notificationDetailTypeBugFix,
      アップデート: styles.notificationDetailTypeUpdate,
    };
    return (
      functionMap[notificationType] ||
      styles.notificationsNotificationTypeBugFix
    );
  };

  return (
    <div className={styles.notificationDetailContainer}>
      <div className={styles.notificationDetailContentContainer}>
        <div className={styles.notificationDetailTypeContainer}>
          <div className={getNotificationTypeClassName(notification.notification_type[0])}>
            {notification.notification_type[0]}
          </div>
          <div className={styles.notificationDetailPublishedAt}>{notification.publishedAt}</div>
        </div>
        <div className={styles.notificationDetailTitle}>{notification.title}</div>
        <div className={styles.notificationDetailContentText}>{parse(notification.content)}</div>
        <div className={styles.notificationDetailBackButton}>
          <Link href="/notifications">一覧へ戻る</Link>
        </div>
      </div>
    </div>
  );
};
