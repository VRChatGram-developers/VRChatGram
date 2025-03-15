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
    <div className={styles.otherPostsContainer}>
      <p className={styles.otherPostsTitle}>「{post.user?.name}」他の投稿</p>
      <div className={styles.otherPostsListContainer}>
        {post.otherPostList.map((post) => (
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
              isLiked: isLiked,
              setIsLiked: setIsLiked,
              handleLikeOrUnlike: () => {
                setIsLiked(!isLiked);
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};
