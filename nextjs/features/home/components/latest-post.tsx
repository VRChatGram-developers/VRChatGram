"use client";

import styles from "../styles/latest-post.module.scss";
import { LatestPost as LatestPostType } from "../types/index";
import { PostCard } from "@/components/post-card";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState } from "react";

export const LatestPost = ({
  latestPostList,
  setIsLiked,
  setLatestPostList,
}: {
  latestPostList: LatestPostType[];
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
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
      prevList.map((post) =>
        post.id === postId ? { ...post, is_liked: !currentLiked } : post
      )
    );
  };

  return (
    <>
      <div className={styles.latestPostContainer}>
        <p className={styles.latestPostTitle}>新着</p>
        <div className={styles.latestPostListConatiner}>
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
                setIsLiked: setIsLiked,
                handleLikeOrUnlike: () => handleLike(post.id),
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
