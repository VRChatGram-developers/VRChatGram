"use client";

import styles from "@/features/users/styles/user-home.module.scss";
import { User } from "@/features/users/types/index";
import { useState } from "react";
import { PostCard } from "@/components/layouts/post-card";
import { SocialLink } from "@/features/users/components/profile/social-link";

export const UserHome = ({
  user,
  isUserEditing,
  introductionTitle,
  setIntroductionTitle,
  introductionDetail,
  setIntroductionDetail,
  handleEditSocialLink,
}: {
  user: User;
  isUserEditing: boolean;
  introductionTitle: string;
  setIntroductionTitle: (introductionTitle: string) => void;
  introductionDetail: string;
  setIntroductionDetail: (introductionDetail: string) => void;
  handleEditSocialLink: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles.profileContentContaienr}>
      <div className={styles.profileContent}>
        {isUserEditing ? (
          <div className={styles.profileContentIntroduction}>
            <input
              type="text"
              defaultValue={introductionTitle}
              className={styles.profileIntroduceTitle}
              onChange={(e) => {
                setIntroductionTitle(e.target.value);
              }}
              placeholder="タイトル"
            />
            <textarea
              defaultValue={introductionDetail}
              className={styles.profileIntroduce}
              onChange={(e) => {
                setIntroductionDetail(e.target.value);
              }}
              placeholder="詳細"
            />
          </div>
        ) : (
          <div className={styles.profileContentIntroduction}>
            <p className={styles.profileIntroduceTitle}>{introductionTitle}</p>
            <p className={styles.profileIntroduce}>{introductionDetail}</p>
          </div>
        )}
        <SocialLink
          socialLinks={user.social_links}
          isUserEditing={isUserEditing}
          handleEditSocialLink={handleEditSocialLink}
        />
      </div>

      <div className={styles.userPostPopularContainer}>
        <p className={styles.userPostPopularTitle}>人気ポスト</p>
        <div className={styles.userPostPopularListConatiner}>
          {user.top4Posts.map((post) => (
            <PostCard
              key={post.id}
              postCardProps={{
                postId: post.id,
                myId: user.my_id,
                postName: post.title,
                postImageUrl: post.images[0].url,
                postImageCount: Number(post.images.length),
                userName: user.name,
                userImageUrl: user.profile_url || "/default-icon-user.png",
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
