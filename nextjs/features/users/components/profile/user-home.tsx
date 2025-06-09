"use client";

import styles from "@/features/users/styles/user-home.module.scss";
import { User } from "@/features/users/types/index";
import { useState } from "react";
import { PostCard } from "@/features/posts/components/post-card";
import { SocialLink } from "@/features/users/components/profile/social-link";
import { SocialLink as SocialLinkType, Post } from "@/features/users/types/index";

export const UserHome = ({
  user,
  socialLinks,
  isUserEditing,
  introductionTitle,
  setIntroductionTitle,
  introductionDetail,
  setIntroductionDetail,
  handleEditSocialLink,
  top4Posts,
}: {
  user: User;
  socialLinks: SocialLinkType[];
  isUserEditing: boolean;
  introductionTitle: string;
  setIntroductionTitle: (introductionTitle: string) => void;
  introductionDetail: string;
  setIntroductionDetail: (introductionDetail: string) => void;
  handleEditSocialLink: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  top4Posts: Post[];
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
          socialLinks={socialLinks}
          isUserEditing={isUserEditing}
          handleEditSocialLink={handleEditSocialLink}
        />
      </div>

      <div className={styles.userPostPopularContainer}>
        <p className={styles.userPostPopularTitle}>人気ポスト</p>
        <div className={styles.userPostPopularListConatiner}>
          {top4Posts.map((post: Post) => (
            <PostCard
              key={post.id}
              postCardProps={{
                postId: post.id,
                myId: user.my_id,
                postName: post.title,
                postImageUrl: post.images[0].url,
                postImageCount: Number(post.images.length),
                userName: user.name,
                userImageUrl: user.profile_url || "/user-icon.png",
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
