"use client";

import styles from "../../styles/other-post-list.module.scss";
import { PostDetail as PostDetailType, UserOtherPost } from "@/features/posts/types/index";
import { PostCard } from "@/components/layouts/post-card";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useState } from "react";

export const OtherPostList = ({
  post,
  setIsLiked,
}: {
  post: PostDetailType;
  setIsLiked: (isLiked: boolean) => void;
}) => {
  const { handleLikeOrUnlike } = useLikePost();
  const [otherPostList, setOtherPostList] = useState<UserOtherPost[]>(post.otherPostList);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    Object.fromEntries(post.otherPostList.map((post) => [post.id, post.is_liked]))
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
      <p className={styles.otherPostsTitle}>「{post.user?.name}」他の投稿</p>
      <div className={styles.otherPostsListContainer}>
        {otherPostList.map((post) => (
          <PostCard
            key={post.id}
            postCardProps={{
              postId: post.id,
              myId: post.user?.my_id,
              postName: post.title,
              postImageUrl: post.images[0].url,
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

