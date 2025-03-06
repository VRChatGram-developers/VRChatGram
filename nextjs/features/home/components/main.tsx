"use client";

import Image from "next/image";
import { Notification } from "../types/index";
import { useState, useEffect, Key } from "react";
import { Tag } from "../types/tag";
import { PopularTag } from "./popular-tag";
import {
  LatestPost as LatestPostType,
  PopularPost as PopularPostType,
  XPost as XPostType,
} from "../types/index";
import { PopularPostList } from "./popular-post-list";
import { LatestPost } from "./latest-post";
import { XPost } from "./x-post";
import styles from "../styles/main.module.scss";
import Link from "@/node_modules/next/link";
import { UrlObject } from "url";

export const Main = ({
  popularPostList,
  latestPostList,
  popularTagList,
  notifications,
  latestPostListWithX,
}: {
  notifications: Notification[];
  latestPostList: LatestPostType[];
  popularTagList: Tag[];
  popularPostList: PopularPostType[];
  latestPostListWithX: XPostType[];
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [latestPosts, setLatestPosts] = useState<LatestPostType[]>([]);
  const [popularPosts, setPopularPosts] = useState<PopularPostType[]>([]);
  const [latestPostsWithX, setLatestPostsWithX] = useState<XPostType[]>([]);

  useEffect(() => {
    setLatestPosts(latestPostList);
    setPopularPosts(popularPostList);
    setLatestPostsWithX(latestPostsWithX);
  }, [latestPostList, popularPostList, latestPostsWithX]);

  const testNews = [
    {
      imageURL:
        "https://pbs.twimg.com/media/GiIBx39a0AE30pa?format=jpg&name=large",
      linkUrl: "/",
    },
    {
      imageURL:
        "https://pbs.twimg.com/media/GjOaoOYbgAAJRaD?format=jpg&name=medium",
      linkUrl: "/",
    },
    {
      imageURL:
        "https://pbs.twimg.com/media/Gc_EUiKbYAEpQUp?format=jpg&name=4096x4096",
      linkUrl: "/",
    },
    {
      imageURL:
        "https://pbs.twimg.com/media/GLpW566bUAAmrmI?format=jpg&name=4096x4096",
      linkUrl: "/",
    },
    {
      imageURL:
        "https://pbs.twimg.com/media/F3PiVIYaAAEaFla?format=jpg&name=large",
      linkUrl: "/",
    },
    {
      imageURL:
        "https://pbs.twimg.com/media/GQWxLH1a8AAeTou?format=jpg&name=large",
      linkUrl: "/",
    },
    {
      imageURL:
        "https://pbs.twimg.com/media/GMoEo5CboAAJNsD?format=jpg&name=large",
      linkUrl: "/",
    },
  ];

  return (
    <>
      {/* PC用 */}
      <div className={styles.mainContainer}>
        <div className={styles.topImage}>
          <div className={styles.topNoticeMainContainer}>
            {testNews.length > 0 && (
              <Image
                src={testNews[0].imageURL}
                alt="メイン画像"
                width={1680}
                height={384}
                className={styles.topNoticeMainImage}
              />
            )}
          </div>

          <div className={styles.mainImagesContainer}>
            <div className={styles.mainImagesContent}>
              {testNews.map(({ imageURL, linkUrl }, index: Key) => (
                <Link href={linkUrl} key={index}>
                  <Image
                    src={imageURL}
                    alt="メイン画像"
                    width={1680}
                    height={384}
                    className={styles.mainImage}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.mainSecondContainer}>
            <div className={styles.mainSecondContainerFirst}>
              <div className={styles.mainSecondContainerFirstBox}>
                <p className={styles.mainSecondTitle}>初めての方はこちら</p>
                <Image
                  src="/shoshinsha-mark.png"
                  alt="初心者マーク"
                  width={17}
                  height={17}
                  className="mr-2"
                />
              </div>
              <div className={styles.mainSecondContainerSecondBox}>
                <div className={styles.mainSecondContainerImageContainer}>
                  <Image
                    src="/top-image2.png"
                    alt="画像2"
                    width={402}
                    height={194}
                    className={styles.mainSecondContainerImage}
                  />
                </div>
                <div className={styles.mainSecondContainerImageContainer}>
                  <Image
                    src="/top-image3.png"
                    alt="画像3"
                    width={402}
                    height={194}
                    className={styles.mainSecondContainerImage}
                  />
                </div>
              </div>
            </div>

            <div className={styles.mainSecondContainerThirdBox}>
              <p className={styles.mainSecondTitle}>お知らせ</p>
              <div className={styles.notificationContainer}>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles.notificationsList}
                  >
                    <div className={styles.notificationsListBox}>
                      <div className={styles.notificationsListBoxText}>
                        <span
                          className={
                            notification.notification_type === "release"
                              ? styles.notificationsListBoxTextRelease
                              : notification.notification_type === "important"
                              ? styles.notificationsListBoxTextImportant
                              : styles.notificationsListBoxTextCommon
                          }
                        >
                          {notification.notification_type}
                        </span>
                        <div className={styles.notificationsContainer}>
                          <time className={styles.notificationTime}>
                            {notification.published_at}
                          </time>
                          {notification.content && (
                            <p className={styles.notificationContent}>
                              {notification.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* モバイル用 */}
      <div className={styles.mobileMainContainer}>
        <div className={styles.mobileMainImageContaier}>
          {testNews.length > 0 && (
            <Image
              src={testNews[0].imageURL}
              alt="メイン画像"
              width={1680}
              height={384}
              className={styles.mobileMainImage}
            />
          )}
        </div>

        {/* お知らせ並び */}
        <div className={styles.mobileSubImageContainer}>
          {testNews.map(({ imageURL, linkUrl }, index: Key) => (
            <Link href={linkUrl} key={index}>
              <Image
                src={imageURL}
                alt="メイン画像"
                width={1680}
                height={384}
                className={styles.mobileSubImage}
              />
            </Link>
          ))}
        </div>

        <div className={styles.mobileMainSecondContainerThirdBox}>
          <p className={styles.mobileMainSecondTitle}>お知らせ</p>
          <div className={styles.mobileNotificationContainer}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={styles.mobileNotificationsList}
              >
                <div className={styles.mobileNotificationsListBox}>
                  <div className={styles.mobileNotificationsListBoxText}>
                    <span
                      className={
                        notification.notification_type === "release"
                          ? styles.mobileNotificationsListBoxTextRelease
                          : notification.notification_type === "important"
                          ? styles.mobileNotificationsListBoxTextImportant
                          : styles.mobileNotificationsListBoxTextCommon
                      }
                    >
                      {notification.notification_type}
                    </span>
                    <div className={styles.mobileNotificationsContainer}>
                      <time className={styles.mobileNotificationTime}>
                        {notification.published_at}
                      </time>
                      {notification.content && (
                        <p className={styles.mobileNotificationContent}>
                          {notification.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mobileMainSecondContainer}>
          <div className={styles.mobileMainSecondContainerFirstBox}>
            <p className={styles.mobileMainSecondTitle}>初めての方はこちら</p>
            <Image
              src="/shoshinsha-mark.png"
              alt="初心者マーク"
              width={24}
              height={24}
              className="mr-2"
            />
          </div>
          <div className={styles.mobileMainSecondContainerSecondBox}>
            <div className={styles.mobileMainSecondContainerImageContent}>
              <Image
                src="/top-image2.png"
                alt="画像2"
                width={402}
                height={194}
                className={styles.mobileMainSecondContainerImage}
              />
            </div>
            <div className={styles.mobileMainSecondContainerImageContent}>
              <Image
                src="/top-image3.png"
                alt="画像3"
                width={402}
                height={194}
                className={styles.mobileMainSecondContainerImage}
              />
            </div>
          </div>
        </div>
      </div>

      <PopularPostList
        popularPostList={popularPosts}
        setIsLiked={setIsLiked}
        setPopularPostList={setPopularPosts}
      />
      <PopularTag popularTagList={popularTagList} />
      <LatestPost
        latestPostList={latestPosts}
        setIsLiked={setIsLiked}
        setLatestPostList={setLatestPosts}
      />
      <XPost
        latestPostListWithX={latestPostListWithX}
        setLatestPostListWithX={setLatestPostsWithX}
      />
    </>
  );
};
