"use client";

import styles from "../styles/user-home.module.scss";
import { User } from "@/features/users/types/index";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { useState } from "react";
import { PostCard } from "@/components/post-card";

export const UserHome = ({ user }: { user: User }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles.profileContentContaienr}>
      <div className={styles.profileContent}>
        <div className={styles.profileContentIntroduction}>
          <p className={styles.profileIntroduceTitle}>ここにタイトル</p>
          <p className={styles.profileIntroduce}>{user.introduce}</p>
        </div>
        <div className={styles.profileSocialLinksContainer}>
          <p className={styles.profileSocialLinksTitle}>SNSリンク</p>
          <div className={styles.profileIntroduceContent}>
            <FaXTwitter size={36} />
            <p className={styles.profileIntroduceLink}>
              http://x.com/user/hogehoge
            </p>
          </div>
          <div className={styles.profileIntroduceContent}>
            <FaDiscord size={36} />
            <p className={styles.profileIntroduceLink}>hogefuga_piyo</p>
          </div>
        </div>
      </div>

      <div className={styles.userPostPopularContainer}>
        <p className={styles.userPostPopularTitle}>人気ポスト</p>
        <div className={styles.userPostPopularListConatiner}>
          {user.top4Posts.map((post) => (
            <PostCard
              key={post.id}
              postCardProps={{
                postName: post.title,
                postImageUrl: "/home/new-post-image.png",
                postImageCount: Number(post.images.length),
                userName: user.name,
                userImageUrl: "/users/post-sample-image2.png",
                isLiked: isLiked,
                setIsLiked: setIsLiked,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
