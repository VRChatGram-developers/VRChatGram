"use client";

import { PopularPost } from "../types/index";
import _ from "lodash";
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
  const [chunkedPosts, setChunkedPosts] = useState<PopularPost[][]>([]);
  const { handleLikeOrUnlike } = useLikePost();

  const chunkPopularPostList = (postList: PopularPost[]) => {
    return _.chunk(postList, 4);
  };

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

    const updatedChunkedPosts = chunkPopularPostList(popularPostList);
    setChunkedPosts(updatedChunkedPosts);
  }, [popularPostList]);

  return (
    <>
      <div className={styles.popularPostListContainer}>
        <p className={styles.popularPostListTitle}>ピックアップ</p>
        {chunkedPosts.map((chunckedPost, index) => (
          <div key={index} className={styles.popularPostList}>
            {chunckedPost.map((post) => (
              <PostCard
                key={`${index}-${post.id}`}
                postCardProps={{
                  postId: post.id,
                  userId: post.user.id,
                  postName: post.title,
                  postImageUrl: "/pickup-image.png",
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
        ))}
      </div>
    </>
  );
};
