"use client";

import styles from "../styles/user-home.module.scss";
import { User } from "@/features/users/types/index";
import { PostCard } from "@/components/post-card";

export const UserHome = ({ user }: { user: User }) => {
  return (
    <div className={styles.profileContentWrapper}>
      <div className={styles.profileContent}>
        <div className={styles.profileContentIntroduction}>{user.introduce}</div>
        <div className={styles.profileSocialLinks}>Twitter</div>
      </div>

      <div className={styles.likesPosts}>
        <div className={styles.likesPostsTitle}>
          <p>人気ポスト</p>
        </div>

        <div className={styles.likesPostsList}>
          {user.top4Posts.map((post) => (
            <PostCard
              key={post.id}
              postCardProps={{
                postId: post.id,
                userId: user.id,
                postName: post.title,
                postImageUrl: "/home/new-post-image.png",
                postImageCount: Number(post.images.length),
                userName: user.name,
                userImageUrl: "/users/post-sample-image2.png",
                isLiked: false,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
