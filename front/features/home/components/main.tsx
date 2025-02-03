"use client";

import Image from "next/image";
import { Notifications, Posts } from "../types/notification";
import { MdOutlinePhoto } from "react-icons/md";
import { useState } from "react";

export const Main = ({ notifications, latestPosts }: { notifications: Notifications, latestPosts: Posts }) => {
  const [isLiked, setIsLiked] = useState(false);
  console.log(notifications);

  return (
    <>
      <div className="mx-6">
        <div className="max-w-[1680px] mx-auto">
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
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/top-image.png"
                    alt="画像3"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg"
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
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/top-image.png"
                    alt="画像3"
                    width={402}
                    height={64}
                    className="w-full h-full object-cover rounded-lg"
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
                {notifications.notifications.map((notification) => (
                  <div key={notification.id} className="bg-white rounded-lg duration-200">
                    <div className="pt-4">
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
                              style={{ fontSize: "12px", fontFamily: "Noto Sans JP" }}
                            >
                              {new Date(notification.published_at)
                                .toLocaleDateString("ja-JP", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                                .replace(/\//g, ".")}
                            </time>
                            {notification.content && (
                              <p
                                className="mt-1 text-sm text-gray-600"
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Noto Sans JP",
                                  whiteSpace: "pre-wrap",
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

      {/* TODO: コンポーネントで切り出す */}
      <div className="w-full h-[1494px] bg-[#F5F5F5]">
        <div className="mx-6">
          <div className="max-w-[1680px] mx-auto pt-[40px]">
            <h2
              className="text-[#151C4B] font-medium text-center"
              style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
            >
              ピックアップ
            </h2>
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex justify-center mt-6 mb-6 space-x-4">
                {[1, 2, 3, 4].map((col) => (
                  <div key={`${row}-${col}`} className="w-[402px] relative">
                    <Image
                      src="/pickup-image.png"
                      alt={`ピックアップ画像 ${row}-${col}`}
                      width={402}
                      height={384}
                      className="w-full h-[384px] object-cover rounded-lg"
                    />
                    <div
                      className="absolute top-4 right-4 w-[64px] h-[32px] bg-[#00000033] flex items-center justify-center"
                      style={{ borderRadius: "40px" }}
                    >
                      <MdOutlinePhoto
                        className="text-white text-2xl"
                        style={{ width: "18px", height: "18px" }}
                      />
                      <p
                        className="text-white"
                        style={{
                          marginLeft: "15px",
                          fontSize: "14px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                        }}
                      >
                        6
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "64px",
                          height: "64px",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsLiked(!isLiked)}
                      >
                        {isLiked ? (
                          <Image src="/heart.png" alt="heart" width={64} height={64} />
                        ) : (
                          <Image src="/heart-outline.png" alt="heart" width={64} height={64} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TODO: コンポーネントで切り出す */}
      <div className="w-full h-[849px]">
        <div className="mx-6">
          <div className="max-w-[1680px] mx-auto pt-[40px]">
            <h2
              className="text-[#151C4B] text-center"
              style={{ fontSize: "40px", fontFamily: "Noto Sans JP", fontWeight: "bold" }}
            >
              作品を検索する
            </h2>
          </div>
          <div className="flex justify-center mt-6 mb-6 space-x-4">
            <div className="flex-1 rounded-md">
              <div className="flex space-x-4 mt-4 overflow-hidden">
                <div className="w-1/2">
                  {/*背景を#FFC596の枠を作成して  */}
                  <div
                    className="w-full h-[320px] bg-[#FFC596] relative"
                    style={{ borderRadius: "16px" }}
                  >
                    <p
                      className="text-[#FFFFFF] absolute"
                      style={{
                        top: "76px",
                        left: "100px",
                        fontSize: "40px",
                        fontFamily: "Noto Sans JP",
                        fontWeight: "bold",
                        width: "260px",
                      }}
                    >
                      アバター写真
                    </p>
                    <div
                      className="absolute bg-[#FFFFFF]"
                      style={{ top: "172px", left: "100px", width: "260px", borderRadius: "16px" }}
                    >
                      <p
                        className="text-[#FFC596] text-center"
                        style={{
                          fontSize: "40px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                        }}
                      >
                        探す
                      </p>
                    </div>
                    <Image
                      src="/home/avater-search-icon.png"
                      alt="search"
                      width={300}
                      height={320}
                      className="absolute"
                      style={{ top: "0px", left: "340px" }}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div
                    className="w-full h-[320px] bg-[#151C4B] relative"
                    style={{ borderRadius: "16px" }}
                  >
                    <p>ワールドー写真</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-md">
            <div className="flex space-x-4 mt-4 overflow-hidden">
              <div className="w-1/2">
                <div className="flex space-x-4 mt-4 overflow-hidden">
                  {/*#女性アバター */}
                  <div className="w-1/3 relative">
                    <Image
                      src="/home/femailtag-icon.png"
                      alt="画像2"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                      <p
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                          left: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        #女性アバター
                      </p>
                    </div>
                  </div>
                  {/*#お砂糖 */}
                  <div className="w-1/3 relative">
                    <Image
                      src="/home/femailtag-icon.png"
                      alt="画像2"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                      <p
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                          left: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        #お砂糖
                      </p>
                    </div>
                  </div>

                  {/*#キプウェル */}
                  <div className="w-1/3 relative">
                    <Image
                      src="/home/femailtag-icon.png"
                      alt="画像2"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                      <p
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                          left: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        #キプウェル
                      </p>
                    </div>
                  </div>
                </div>
                {/* TODO: ここに3つの画像を並列で表示する */}
              </div>
              <div className="w-1/2">
                <div className="flex space-x-4 mt-4 overflow-hidden">
                  {/*#男性アバター */}
                  <div className="w-1/3 relative">
                    <Image
                      src="/home/femailtag-icon.png"
                      alt="画像2"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                      <p
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                          left: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        #男性アバター
                      </p>
                    </div>
                  </div>
                  {/*#ケモノ */}
                  <div className="w-1/3 relative">
                    <Image
                      src="/home/femailtag-icon.png"
                      alt="画像2"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                      <p
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                          left: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        #ケモノ
                      </p>
                    </div>
                  </div>

                  {/*#改変 */}
                  <div className="w-1/3 relative">
                    <Image
                      src="/home/femailtag-icon.png"
                      alt="画像2"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                      <p
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Noto Sans JP",
                          fontWeight: "bold",
                          left: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        #改変
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-md"></div>
        </div>
        {/* TODO: この下を */}
      </div>

      {/* TODO: コンポーネントで切り出す */}
      {/* 新着 */}
      <div className="w-full h-[610px] bg-[#F5F5F5]">
        <div className="mx-6">
          <div className="max-w-[1680px] mx-auto pt-[40px]">
            <h2
              className="text-[#151C4B] font-medium text-center"
              style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
            >
              新着
            </h2>
            <div className="flex justify-center mt-6 mb-6 space-x-4">
              {latestPosts.posts.map((post) => (
                <div key={`${post.id}`} className="w-[402px] relative">
                  <Image
                    src="/home/new-post-image.png"
                    alt={`ピックアップ画像 $${post.id}`}
                    width={402}
                    height={384}
                    className="w-full h-[384px] object-cover rounded-lg"
                  />
                  <div
                    className="absolute top-4 right-4 w-[64px] h-[32px] bg-[#00000033] flex items-center justify-center"
                    style={{ borderRadius: "40px" }}
                  >
                    <MdOutlinePhoto
                      className="text-white text-2xl"
                      style={{ width: "18px", height: "18px" }}
                    />
                    <p
                      className="text-white"
                      style={{
                        marginLeft: "15px",
                        fontSize: "14px",
                        fontFamily: "Noto Sans JP",
                        fontWeight: "bold",
                      }}
                    >
                      6
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      {isLiked ? (
                        <Image src="/heart.png" alt="heart" width={64} height={64} />
                      ) : (
                        <Image src="/heart-outline.png" alt="heart" width={64} height={64} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TODO: コンポーネントで切り出す */}
      {/* Xからの投稿 */}
      <div className="w-full h-[610px] bg-[#FFFFFF]">
        <div className="mx-6">
          <div className="max-w-[1680px] mx-auto pt-[40px]">
            <h2
              className="text-[#151C4B] font-medium text-center"
              style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
            >
              Xからの投稿
            </h2>
            <div className="flex justify-center mt-6 mb-6 space-x-4">
              {[1, 2, 3, 4].map((col) => (
                <div key={`${col}`} className="w-[402px] relative">
                  <Image
                    src="/home/x-post-sample.png"
                    alt={`ピックアップ画像 $${col}`}
                    width={402}
                    height={384}
                    className="w-full h-[384px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      {isLiked ? (
                        <Image src="/heart.png" alt="heart" width={64} height={64} />
                      ) : (
                        <Image src="/heart-outline.png" alt="heart" width={64} height={64} />
                      )}
                    </div>
                  </div>
                  <div className="absolute" style={{ top: "8px", left: "8px" }}>
                    <Image
                      src="/home/x-icon.png"
                      alt="Xからの投稿"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TODO: コンポーネントで切り出す */}
      {/* Xからの投稿 */}
    </>
  );
};
