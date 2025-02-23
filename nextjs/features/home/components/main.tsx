"use client";

import Image from "next/image";
import { Notification } from "../types/index";
import { useState, useEffect } from "react";
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

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topImage}>
          <div>
            <Image
              src="/top-image.png"
              alt="メイン画像"
              width={1680}
              height={384}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className={styles.mainImagesContainer}>
            <div className={styles.mainImagesContainerFirst}>
              <div className={styles.imageWrapperFirst}>
                <div className={styles.imageFirst}>
                  <Image
                    src="/top-image.png"
                    alt="画像2"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100"
                  />
                </div>
                <div className={styles.imageSecond}>
                  <Image
                    src="/top-image.png"
                    alt="画像3"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100"
                  />
                </div>
              </div>
            </div>

            <div className={styles.mainImagesContainerSecond}>
              <div className={styles.imageWrapperSecond}>
                <div className={styles.imageThird}>
                  <Image
                    src="/top-image.png"
                    alt="画像2"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100 "
                  />
                </div>
                <div className={styles.imageFourth}>
                  <Image
                    src="/top-image.png"
                    alt="画像3"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100"
                  />
                </div>
              </div>
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
                <div className={styles.mainSecondContainerFirstImage}>
                  <Image
                    src="/top-image2.png"
                    alt="画像2"
                    width={402}
                    height={194}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className={styles.mainSecondContainerSecondImage}>
                  <Image
                    src="/top-image3.png"
                    alt="画像3"
                    width={402}
                    height={194}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* <div className={styles.mainSecondContainerCentralLine}></div> */}

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

      <PopularPostList
        popularPostList={popularPosts}
        setPopularPostList={setPopularPosts}
      />
      <PopularTag popularTagList={popularTagList} />
      <LatestPost
        latestPostList={latestPosts}
        setLatestPostList={setLatestPosts}
      />
      <XPost
        latestPostListWithX={latestPostListWithX}
        setLatestPostListWithX={setLatestPostsWithX}
      />
    </>
  );
};
