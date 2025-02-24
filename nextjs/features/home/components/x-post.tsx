"use client";
import Image from "next/image";
import { XPost as XPostType } from "../types/index";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState } from "react";

export const XPost = ({
  latestPostListWithX,
  setLatestPostListWithX,
}: {
  latestPostListWithX: XPostType[];
  setLatestPostListWithX: React.Dispatch<React.SetStateAction<XPostType[]>>;
}) => {
  console.log(latestPostListWithX);

  const { handleLikeOrUnlike } = useLikePost();
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    Object.fromEntries(
      latestPostListWithX.map((post) => [post.id, post.is_liked])
    )
  );

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];

    await handleLikeOrUnlike(postId, currentLiked);

    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));

    setLatestPostListWithX((prevList) =>
      prevList.map((post) =>
        post.id === postId ? { ...post, is_liked: !currentLiked } : post
      )
    );
  };

  console.log(likedPosts);

  return (
    <>
      <div style={{ padding: "3rem 1.5rem" }} className="bg-[#FFFFFF]">
        <div className="max-w-full mx-auto">
          <h2
            className="text-[#151C4B] font-medium text-center"
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              fontFamily: "Noto Sans JP",
            }}
          >
            Xからの投稿
          </h2>
          <div className="flex justify-center mt-6 mb-6 space-x-4">
            {latestPostListWithX.map((post) => (
              <div key={`${post.id}`} className="w-full relative">
                <Image
                  src="/home/x-post-sample.png"
                  alt={`ピックアップ画像 ${post.id}`}
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
                    onClick={() => handleLike(post.id)}
                  >
                    {likedPosts[post.id] ? (
                      <Image
                        src="/heart-outline.png"
                        alt="heart"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <Image
                        src="/heart.png"
                        alt="heart"
                        width={64}
                        height={64}
                      />
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
    </>
  );
};
