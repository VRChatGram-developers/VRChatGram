"use client";

import { PopularPost } from "../types/index";
import { PostCard } from "@/components/post-card";
import styles from "../styles/popular-post-list.module.scss";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState, useEffect } from "react";

export const PopularPostList = ({
  popularPostList,
  setIsLiked,
  setPopularPostList,
}: {
  popularPostList: PopularPost[];
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setPopularPostList: React.Dispatch<React.SetStateAction<PopularPost[]>>;
}) => {
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});
  const { handleLikeOrUnlike } = useLikePost();

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];

    await handleLikeOrUnlike(postId, currentLiked);

    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));

    setPopularPostList((prevList) =>
      prevList.map((post) => (post.id === postId ? { ...post, is_liked: !currentLiked } : post))
    );
  };

  useEffect(() => {
    const updatedLikedPosts = Object.fromEntries(
      popularPostList.map((post) => [post.id, post.is_liked])
    );
    setLikedPosts(updatedLikedPosts);

    // const updatedChunkedPosts = chunkPopularPostList(popularPostList);
  }, [popularPostList]);

  return (
    <>
      <div className={styles.popularPostListContainer}>
        <p className={styles.popularPostListTitle}>ピックアップ</p>
        <div className={styles.popularPostList}>
          {popularPostList.map((post, index) => (
            <PostCard
              key={`${index}-${post.id}`}
              postCardProps={{
                postId: post.id,
                myId: post.user.my_id,
                postName: post.title,
                postImageUrl: post.images[0].url,
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
