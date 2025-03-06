"use client";

import styles from "../styles/user-home.module.scss";
import { User } from "@/features/users/types/index";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { useState } from "react";
import { PostCard } from "@/components/post-card";
import { SocialLink } from "@/features/users/types/index";

const renderSocialLink = (socialLink: SocialLink) => {
  if (!socialLink) {
    return null;
  }

  if (socialLink.platform_name === "x") {
    return (
      <div key={socialLink.platform_name} className={styles.profileIntroduceContent}>
        <FaXTwitter size={36} />
        <p className={styles.profileIntroduceLink}>{socialLink.platform_url}</p>
      </div>
    );
  }

  if (socialLink.platform_name === "discord") {
    return (
      <div key={socialLink.platform_name} className={styles.profileIntroduceContent}>
        <FaDiscord size={36} />
        <p className={styles.profileIntroduceLink}>{socialLink.platform_url}</p>
      </div>
    );
  }

  return (
    <div key={socialLink.platform_name} className={styles.profileIntroduceContent}>
      <FaDiscord size={36} />
      <p className={styles.profileIntroduceLink}>{socialLink.platform_url}</p>
    </div>
  );
};

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
          {user.social_links.map((socialLink) => renderSocialLink(socialLink))}
        </div>
      </div>

      <div className={styles.userPostPopularContainer}>
        <p className={styles.userPostPopularTitle}>人気ポスト</p>
        <div className={styles.userPostPopularListConatiner}>
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
    </div>
  );
};
