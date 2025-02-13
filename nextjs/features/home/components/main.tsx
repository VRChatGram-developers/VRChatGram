"use client";

import Image from "next/image";
import { Notifications } from "../types/notification";
import { useState } from "react";
import { Post } from "../types/post";
import { Tag } from "../types/tag";
import { PopularTag } from "./popular-tag";
import { PopularPost } from "./popular-post";
import { LatestPost } from "./latest-post";
import { XPost } from "./x-post";

export const Main = ({
  popularPostList,
  latestPosts,
  popularTagList,
  notifications,
  latestPostListWithX,
}: {
  notifications: Notifications;
  latestPosts: Post[];
  popularTagList: Tag[];
  popularPostList: Post[];
  latestPostListWithX: Post[];
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const transformNotificationList = notifications.notifications.map((notification) => {
    const year = new Date(notification.published_at).getFullYear();
    const month = String(new Date(notification.published_at).getMonth() + 1).padStart(2, "0"); // `01` 形式にする
    const day = String(new Date(notification.published_at).getDate()).padStart(2, "0");
    const formattedDate = `${year}.${month}.${day}`;
    return {
      ...notification,
      published_at: formattedDate,
    };
  });

  return (
    <>
      <div style={{ padding: "0px 1.5rem 1.5rem 3rem" }} className="bg-[#FFFFFF]">
        <div className="max-w-full mx-auto">
          <div>
            <Image
              src="/top-image.png"
              alt="メイン画像"
              width={1680}
              height={384}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="flex justify-center mt-6 mb-6 space-x-4">
            <div className="flex-1 rounded-md">
              <div className="flex space-x-4 mt-4 overflow-hidden">
                <div className="w-1/2">
                  <Image
                    src="/top-image.png"
                    alt="画像2"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100"
                  />
                </div>
                <div className="w-1/2">
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

            <div className="flex-1 rounded-md">
              <div className="flex space-x-4 mt-4 overflow-hidden">
                <div className="w-1/2">
                  <Image
                    src="/top-image.png"
                    alt="画像2"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100 "
                  />
                </div>
                <div className="w-1/2">
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

          {/* 初めての方はこちら */}

          <div className="flex justify-center mt-6 mb-6 space-x-4">
            <div className="flex-1 rounded-md">
              <div className="flex items-center">
                <p className="font-semibold text-lg">初めての方はこちら</p>
                <Image
                  src="/shoshinsha-mark.png" // 初心者マークの画像パスを指定
                  alt="初心者マーク"
                  width={17}
                  height={17}
                  className="mr-2"
                />
              </div>
              <div className="flex space-x-4 mt-4 overflow-hidden">
                <div className="w-1/2">
                  <Image
                    src="/top-image2.png"
                    alt="画像2"
                    width={402}
                    height={194}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-1/2">
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

            <div className="border-l border-[#D9D9D9] mx-4 self-stretch"></div>

            <div className="flex-1 rounded-md">
              <p className="font-semibold text-lg">お知らせ</p>
              <div className="">
                {transformNotificationList.map((notification) => (
                  <div key={notification.id} className="bg-white rounded-lg duration-200">
                    <div className="pt-6">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span
                            style={{
                              width: "118px",
                              height: "56px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "16px 16px 16px 16px",
                              background:
                                notification.notification_type === "release"
                                  ? "#69BEEFCC"
                                  : notification.notification_type === "important"
                                  ? "#EBEF69CC"
                                  : "rgba(234, 179, 8, 0.8)",
                            }}
                            className="text-[#000000] text-base font-medium"
                          >
                            {notification.notification_type}
                          </span>
                          <div className="ml-7 flex flex-col">
                            <time
                              className="text-sm text-gray-500"
                              style={{
                                fontSize: "12px",
                                fontFamily: "Noto Sans JP",
                                fontWeight: "bold",
                                color: "#000000",
                              }}
                            >
                              {notification.published_at}
                            </time>
                            {notification.content && (
                              <p
                                className="mt-1 text-sm text-gray-600"
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Noto Sans JP",
                                  whiteSpace: "pre-wrap",
                                  fontWeight: "bold",
                                  color: "#000000",
                                }}
                              >
                                {notification.content}
                              </p>
                            )}
                          </div>
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

      <PopularPost popularPostList={popularPostList} isLiked={isLiked} setIsLiked={setIsLiked} />
      <PopularTag popularTagList={popularTagList} />
      <LatestPost latestPosts={latestPosts} isLiked={isLiked} setIsLiked={setIsLiked} />
      <XPost latestPostListWithX={latestPostListWithX} isLiked={isLiked} setIsLiked={setIsLiked} />
    </>
  );
};
