"use client";

import styles from "../styles/other-post-list.module.scss";
import { PostDetail as PostDetailType } from "@/features/posts/types/index";
import { PostCard } from "@/components/post-card";
export const OtherPostList = ({
  post,
  setIsLiked,
  isLiked,
}: {
  post: PostDetailType;
  setIsLiked: (isLiked: boolean) => void;
  isLiked: boolean;
}) => {
  if (post.otherPostList.length === 0) {
    return null;
  }

  return (
    <div className={styles.otherPosts}>
      <div className={styles.otherPostsTitle}>
        <p>「{post.user?.name}」他の投稿</p>
      </div>
      <div className={styles.otherPostsList}>
        {post.otherPostList.map((post) => (
          <PostCard
            key={post.id}
            postCardProps={{
              postName: post.title,
              postImageUrl: "/users/post-sample-image3.png",
              postImageCount: post.images.length,
              userName: post.user?.name,
              userImageUrl: "/users/post-sample-image.png",
              isLiked: isLiked,
              setIsLiked: setIsLiked,
            }}
          />
        ))}
      </div>
    </div>
  );
};
