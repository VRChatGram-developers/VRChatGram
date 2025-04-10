"use client";

import styles from "../styles/notifications-list.module.scss";
import { Notification } from "@/features/notifications/type";
import { useRouter } from "next/navigation";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
import { createQueryParams } from "@/utils/queryParams";

export const NotificationsList = ({
  notifications,
  totalPages,
  currentPage,
}: {
  notifications: Notification[];
  totalPages: number;
  currentPage: number;
}) => {
  const removeHtmlTags = (text: string) => text.replace(/<[^>]*>?/g, "");
  const router = useRouter();

  const handleRedirectToDetail = (id: string) => {
    router.push(`/notifications/${id}`);
  };

  const handlePageChange = async (page: number) => {
    const query = createQueryParams({ page: page + 1 });
    router.push(`/notifications?${query}`);
  };

  const getNotificationTypeClassName = (notificationType: string) => {
    const functionMap: Record<string, string> = {
      バグ修正: styles.notificationsNotificationTypeBugFix,
      アップデート: styles.notificationsNotificationTypeUpdate,
    };
    return (
      functionMap[notificationType] ||
      styles.notificationsNotificationTypeBugFix
    );
  };

  return (
    <div className={styles.notificationsListContainer}>
      <div className={styles.notificationsListContent}>
        {notifications.map((notification) => {
          return (
            <div
              className={styles.notificationsElementContainer}
              key={notification.id}
              onClick={() => handleRedirectToDetail(notification.id)}
            >
              <div className={styles.notificationMetaContainer}>
                <div
                  className={getNotificationTypeClassName(
                    notification.notification_type[0]
                  )}
                >
                  <p className={styles.notificationsNotificationTypeText}>
                    {notification.notification_type[0]}
                  </p>
                </div>
                <div className={styles.notificationsPublishDate}>
                  <p className={styles.notificationsPublishDateText}>
                    {notification.publishedAt}
                  </p>
                </div>
              </div>
              <div className={styles.notificationsContentContainer}>
                <div className={styles.notificationsTitle}>
                  {notification.title}
                </div>

                <div className={styles.notificationsContentTextContent}>
                  <p className={styles.notificationsContentText}>
                    {removeHtmlTags(notification.content)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(0)}
        >
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i + 1
                ? styles.paginationSelectedButton
                : styles.paginationButton
            }
          >
            {i + 1}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          <MdOutlineLastPage className={styles.paginationButtonIcon} />
        </button>
      </div>
    </div>
  );
};
