"use client";

import styles from "../styles/user-home.module.scss";
import { User } from "@/features/users/types/index";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { useState } from "react";
import { PostCard } from "@/components/post-card";
import { SocialLink } from "@/features/users/types/index";
import { GrPersonalComputer } from "react-icons/gr";

const renderSocialLink = (socialLink: SocialLink) => {
  if (!socialLink) {
    return null;
  }

  if (socialLink.platform_types === "x") {
    return (
      <div key={socialLink.platform_types} className={styles.profileIntroduceContent}>
        <FaXTwitter size={36} />
        <p className={styles.profileIntroduceLink}>{socialLink.platform_url}</p>
      </div>
    );
  }

  if (socialLink.platform_types === "discord") {
    return (
      <div key={socialLink.platform_types} className={styles.profileIntroduceContent}>
        <FaDiscord size={36} />
        <p className={styles.profileIntroduceLink}>{socialLink.platform_url}</p>
      </div>
    );
  }

  return (
    <div key={socialLink.platform_types} className={styles.profileIntroduceContent}>
      <GrPersonalComputer size={36} />
      <p className={styles.profileIntroduceLink}>{socialLink.platform_url}</p>
    </div>
  );
};

export const renderEditSocialLink = (
  socialLink: SocialLink,
  handleEditSocialLink: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
  index: number
) => {
  if (!socialLink) {
    return null;
  }

  if (socialLink.platform_types === "x") {
    return (
      <div key={index} className={styles.profileIntroduceContent}>
        <FaXTwitter size={36} />
        <input
          type="text"
          defaultValue={socialLink.platform_url}
          className={styles.profileIntroduceLink}
          onChange={(e) => {
            handleEditSocialLink(e, index);
          }}
        />
      </div>
    );
  }

  if (socialLink.platform_types === "discord") {
    return (
      <div key={index} className={styles.profileIntroduceContent}>
        <FaDiscord size={36} />
        <input
          type="text"
          defaultValue={socialLink.platform_url}
          className={styles.profileIntroduceLink}
          onChange={(e) => {
            handleEditSocialLink(e, index);
          }}
        />
      </div>
    );
  }

  return (
    <div key={index} className={styles.profileIntroduceContent}>
      <GrPersonalComputer size={36} />
      <input
        type="text"
        defaultValue={socialLink.platform_url}
        className={styles.profileIntroduceLink}
        onChange={(e) => {
          handleEditSocialLink(e, index);
        }}
      />
    </div>
  );
};

export const UserHome = ({
  user,
  isUserEditing,
  introductionTitle,
  setIntroductionTitle,
  introductionDetail,
  setIntroductionDetail,
  socialLinks,
  handleEditSocialLink,
}: {
  user: User;
  isUserEditing: boolean;
  introductionTitle: string;
  setIntroductionTitle: (introductionTitle: string) => void;
  introductionDetail: string;
  setIntroductionDetail: (introductionDetail: string) => void;
  socialLinks: SocialLink[];
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
            />
            <textarea
              defaultValue={introductionDetail}
              className={styles.profileIntroduce}
              onChange={(e) => {
                setIntroductionDetail(e.target.value);
              }}
            />
          </div>
        ) : (
          <div className={styles.profileContentIntroduction}>
            <p className={styles.profileIntroduceTitle}>{introductionTitle}</p>
            <p className={styles.profileIntroduce}>{introductionDetail}</p>
          </div>
        )}
        <div className={styles.profileSocialLinksContainer}>
          <p className={styles.profileSocialLinksTitle}>SNSリンク</p>
          {isUserEditing
            ? socialLinks.map((socialLink, index) =>
                renderEditSocialLink(socialLink, handleEditSocialLink, index)
              )
            : user.social_links.map((socialLink) => renderSocialLink(socialLink))}
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
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
