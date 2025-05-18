"use client";

import Image from "next/image";
import { Notification } from "../types/index";
import styles from "../styles/main.module.scss";
import Link from "@/node_modules/next/link";
import parse from "html-react-parser";

export const Main = ({ notifications }: { notifications: Notification[] }) => {
  const testNews = [
    {
      imageURL: "https://pbs.twimg.com/media/GiIBx39a0AE30pa?format=jpg&name=large",
      linkUrl: "/",
    },
    {
      imageURL: "https://pbs.twimg.com/media/GjOaoOYbgAAJRaD?format=jpg&name=medium",
      linkUrl: "/",
    },
    {
      imageURL: "https://pbs.twimg.com/media/Gc_EUiKbYAEpQUp?format=jpg&name=4096x4096",
      linkUrl: "/",
    },
    {
      imageURL: "https://pbs.twimg.com/media/GLpW566bUAAmrmI?format=jpg&name=4096x4096",
      linkUrl: "/",
    },
    {
      imageURL: "https://pbs.twimg.com/media/F3PiVIYaAAEaFla?format=jpg&name=large",
      linkUrl: "/",
    },
    {
      imageURL: "https://pbs.twimg.com/media/GQWxLH1a8AAeTou?format=jpg&name=large",
      linkUrl: "/",
    },
    {
      imageURL: "https://pbs.twimg.com/media/GMoEo5CboAAJNsD?format=jpg&name=large",
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
                src="https://d3o6x7pz3sf2lk.cloudfront.net/static/main.webp"
                alt="メイン画像"
                width={1680}
                height={384}
                className={styles.topNoticeMainImage}
                priority
              />
            )}
          </div>

          {/* PC版お知らせ */}
          {/* <div className={styles.mainImagesContainer}>
            <div className={styles.mainImagesContent}>
              {testNews.map(({ imageURL, linkUrl }, index: Key) => (
                <Link href={linkUrl} key={index} className={styles.mainImageLink}>
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
          </div> */}

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
                  <Link href="/introduction">
                    <Image
                      src="https://d3o6x7pz3sf2lk.cloudfront.net/static/vrcss-introduction.webp"
                      alt="画像2"
                      width={402}
                      height={194}
                      className={styles.mainSecondContainerImage}
                    />
                  </Link>
                </div>
                <div className={styles.mainSecondContainerImageContainer}>
                  <Link href="/usage">
                    <Image
                      src="https://d3o6x7pz3sf2lk.cloudfront.net/static/vrcss-usage-guide.webp"
                      alt="画像3"
                      width={402}
                      height={194}
                      className={styles.mainSecondContainerImage}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.mainSecondContainerThirdBox}>
              <p className={styles.mainSecondTitle}>お知らせ</p>
              <div className={styles.notificationContainer}>
                <div className={styles.notificationsList}>
                  {notifications.map((notification) => (
                    <div key={notification.id} className={styles.notificationsListContent}>
                      <div
                        className={`${
                          notification.notification_type[0] === "バグ修正"
                            ? styles.bugFix
                            : notification.notification_type[0] === "アップデート"
                            ? styles.update
                            : styles.release
                        } ${styles.notificationsTagContainer}
                            `}
                      >
                        <p className={styles.text}>{notification.notification_type}</p>
                      </div>
                      <Link
                        className={styles.detailContainer}
                        href={`/notifications/${notification.id}`}
                      >
                        <div className={styles.postDateTime}>{notification.publishedAt}</div>
                        {notification.content && (
                          <div className={styles.postDetailText}>{parse(notification.content)}</div>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className={styles.notificationsMoreContainer}>
                  <Link href={"/notifications"}>お知らせをもっと見る→</Link>
                </div>
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
              src="https://d3o6x7pz3sf2lk.cloudfront.net/static/main.webp"
              alt="メイン画像"
              width={1680}
              height={384}
              className={styles.mobileMainImage}
              priority
            />
          )}
        </div>

        {/* お知らせ並び */}
        {/* <div className={styles.mobileSubImageContainer}>
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
        </div> */}

        <div className={styles.mobileMainSecondContainerThirdBox}>
          <p className={styles.mobileMainSecondTitle}>お知らせ</p>
          <div className={styles.notificationContainer}>
            <div className={styles.notificationsList}>
              {notifications.map((notification) => (
                <div key={notification.id} className={styles.notificationsListContent}>
                  <div
                    className={`${
                      notification.notification_type[0] === "バグ修正"
                        ? styles.bugFix
                        : notification.notification_type[0] === "アップデート"
                        ? styles.update
                        : styles.release
                    } ${styles.notificationsTagContainer}
                            `}
                  >
                    <p className={styles.text}>{notification.notification_type}</p>
                  </div>
                  <Link
                    className={styles.detailContainer}
                    href={`/notifications/${notification.id}`}
                  >
                    <div className={styles.postDateTime}>{notification.publishedAt}</div>
                    {notification.content && (
                      <div className={styles.postDetailText}>{parse(notification.content)}</div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.notificationsMoreContainer}>
              <Link href={"/notifications"}>お知らせをもっと見る→</Link>
            </div>
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
                src="https://d3o6x7pz3sf2lk.cloudfront.net/static/vrcss-introduction.webp"
                alt="画像2"
                width={402}
                height={194}
                className={styles.mobileMainSecondContainerImage}
              />
            </div>
            <div className={styles.mobileMainSecondContainerImageContent}>
              <Image
                src="https://d3o6x7pz3sf2lk.cloudfront.net/static/vrcss-usage-guide.webp"
                alt="画像3"
                width={402}
                height={194}
                className={styles.mobileMainSecondContainerImage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
