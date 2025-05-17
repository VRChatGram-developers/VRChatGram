"use client";

import { PopularPost } from "../types/index";
import { PostCard } from "@/components/layouts/post-card";
import styles from "../styles/popular-post-list.module.scss";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState, useEffect } from "react";


export const PopularPostList = ({
  popularPostList,
}: {
  popularPostList: PopularPost[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>(popularPostList || []);
  const { handleLikeOrUnlike } = useLikePost();

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));

    setPopularPosts((prevList) =>
      prevList.map((post) => (post.id === postId ? { ...post, is_liked: !currentLiked } : post))
    );

    try {
      await handleLikeOrUnlike(postId, currentLiked);
    } catch (error) {
      console.error(error);
      setLikedPosts((prev) => ({ ...prev, [postId]: currentLiked }));
    }
  };

  useEffect(() => {
    const updatedLikedPosts = Object.fromEntries(
      popularPosts.map((post) => [post.id, post.is_liked])
    );
    setLikedPosts(updatedLikedPosts);

    // const updatedChunkedPosts = chunkPopularPostList(popularPostList);
  }, [popularPosts]);

  return (
    <>
      <div className={styles.popularPostListContainer}>
        <p className={styles.popularPostListTitle}>ピックアップ</p>
        <div className={styles.popularPostList}>
          {popularPosts.map((post, index) => (
            <PostCard
              key={`${index}-${post.id}`}
              postCardProps={{
                postId: post.id,
                myId: post.user.my_id,
                postName: post.title,
                postImageUrl: post.images[0].url,
                postImageCount: post.images.length,
                userName: post.user.name,
                userImageUrl: post.user.profile_url,
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
