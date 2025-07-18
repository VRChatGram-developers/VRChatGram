"use client";

import styles from "@/features/posts/styles/other-post-list.module.scss";
import { OtherPost } from "@/features/posts/types/index";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState } from "react";
import dynamic from "next/dynamic";

const PostCard = dynamic(
  () => import("@/features/posts/components/post-card").then((mod) => mod.PostCard),
  { ssr: false }
);

export const OtherPostList = ({
  userOtherPostList,
  setIsLiked,
  userName,
}: {
  userOtherPostList: OtherPost[];
  setIsLiked: (isLiked: boolean) => void;
  userName: string;
}) => {
  const { handleLikeOrUnlike } = useLikePost();
  const [otherPostList, setOtherPostList] = useState<OtherPost[]>(userOtherPostList || []);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    Object.fromEntries(userOtherPostList.map((post: OtherPost) => [post.id, post.is_liked]))
  );

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));

    setOtherPostList((prevList) =>
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
    <div className={styles.otherPostsContainer}>
      <p className={styles.otherPostsTitle}>「{userName}」他の投稿</p>
      <div className={styles.otherPostsListContainer}>
        {otherPostList.map((post) => (
          <PostCard
            key={post.id}
            postCardProps={{
              postId: post.id,
              myId: post.user?.my_id,
              postName: post.title,
              postImageUrl: post.images[0]?.url ?? "",
              postImageCount: post.images?.length ?? 0,
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

