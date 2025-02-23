"use client";

import styles from "../styles/latest-post.module.scss";
import { LatestPost as LatestPostType } from "../types/index";
import { PostCard } from "@/components/post-card";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState } from "react";

export const LatestPost = ({
  latestPostList,
  setLatestPostList,
}: {
  latestPostList: LatestPostType[];
  setLatestPostList: React.Dispatch<React.SetStateAction<LatestPostType[]>>;
}) => {
  const { handleLikeOrUnlike } = useLikePost();
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    Object.fromEntries(latestPostList.map((post) => [post.id, post.is_liked]))
  );

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];

    await handleLikeOrUnlike(postId, currentLiked);

    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));

    setLatestPostList((prevList) =>
      prevList.map((post) => (post.id === postId ? { ...post, is_liked: !currentLiked } : post))
    );
  };

  return (
    <>
      <div className="max-w-full h-full" style={{ padding: "3rem 1.5rem" }}>
        <div>
          <div className="max-w-full mx-auto">
            <h2
              className="text-[#151C4B] font-medium text-center"
              style={{
                fontWeight: "bold",
                fontSize: "40px",
                fontFamily: "Noto Sans JP",
              }}
            >
              新着
            </h2>
            <div className={styles.latestPostConatiner}>
              {latestPostList.map((post) => (
                <PostCard
                  key={post.id}
                  postCardProps={{
                    postId: post.id,
                    userId: post.user.id,
                    postName: post.title,
                    postImageUrl: "/home/new-post-image.png",
                    postImageCount: post.images.length,
                    userName: post.user.name,
                    userImageUrl: "/posts/sample-user-icon.png",
                    isLiked: likedPosts[post.id],
                    handleLikeOrUnlike: () => handleLike(post.id),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
