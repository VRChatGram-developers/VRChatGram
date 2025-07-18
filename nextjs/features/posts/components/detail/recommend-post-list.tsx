"use client";

import styles from "@/features/posts/styles/recommend-post-list.module.scss";
import { RecommendPost } from "@/features/posts/types/index";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState } from "react";
import dynamic from "next/dynamic";

const PostCard = dynamic(
  () => import("@/features/posts/components/post-card").then((mod) => mod.PostCard),
  { ssr: false }
);

export const RecommendPostList = ({
  initialRecommendPostList,
  setIsLiked,
}: {
  initialRecommendPostList: RecommendPost[];
  setIsLiked: (isLiked: boolean) => void;
}) => {
  const { handleLikeOrUnlike } = useLikePost();
  const [recommendPostList, setRecommendPostList] =
    useState<RecommendPost[]>(initialRecommendPostList);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    Object.fromEntries(recommendPostList.map((post) => [post.id, post.is_liked]))
  );

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));

    setRecommendPostList((prevList) =>
      prevList.map((post) => (post.id === postId ? { ...post, is_liked: !currentLiked } : post))
    );
    try {
      await handleLikeOrUnlike(postId, currentLiked);
    } catch (error) {
      console.error(error);
      setLikedPosts((prev) => ({ ...prev, [postId]: currentLiked }));
    }
  };

  return (
    <div className={styles.recommendPostsContainer}>
      <p className={styles.recommendPostsTitle}>あなたへのおすすめ</p>
      <div className={styles.recommendPostsListContainer}>
        {recommendPostList.map((post) => (
          <PostCard
            key={post.id}
            postCardProps={{
              postId: post.id,
              myId: post.user?.my_id,
              postName: post.title,
              postImageUrl: post.images[0]?.url ?? "",
              postImageCount: post.images.length,
              userName: post.user?.name,
              userImageUrl: post.user?.profile_url ?? "",
              isLiked: likedPosts[post.id],
              setIsLiked: setIsLiked,
              handleLikeOrUnlike: () => handleLike(post.id),
            }}
          />
        ))}
      </div>
    </div>
  );
};
