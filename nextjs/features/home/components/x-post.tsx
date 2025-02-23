"use client";

import styles from "../styles/x-post.module.scss";
import Image from "next/image";
import { XPost as XPostType } from "../types/index";
import useLikePost from "@/features/posts/hooks/use-like-post";
import React, { useState } from "react";
import { PostCard } from "@/components/post-card";

export const XPost = ({
  latestPostListWithX,
  setIsLiked,
  setLatestPostListWithX,
}: {
  latestPostListWithX: XPostType[];
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
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
      <div className={styles.latestPostWithXContainer}>
        <p className={styles.latestPostWithXTitle}>Xからの投稿</p>
        <div className={styles.latestPostWithXListConatiner}>
          {latestPostListWithX.map((post) => (
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
