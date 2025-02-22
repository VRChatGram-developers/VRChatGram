"use client";

import styles from "../styles/users.module.scss";
import Image from "next/image";
import { User } from "@/features/users/types/index";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { followUser, unfollowUser } from "@/features/users/endpoint";
import { UserPostList } from "./user-post-list";
import { UserHome } from "./user-home";
import { useSession } from "next-auth/react";

export const Users = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: session } = useSession();
  const handleFollow = async () => {
    await followUser(user.id);
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    await unfollowUser(user.id);
    setIsFollowing(false);
  };

  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profileHeaderIcon}>
          <Image src="/users/profile-icon-sample.png" alt="profile" width={260} height={260} />
        </div>
        <div className={styles.profileUserName}>
          <p className={styles.profileUserNameText}>{user.name}</p>
        </div>
        <div className={styles.profileUserStatus}>
          <div className={styles.profileViewCount}>
            <p>{user.totalViews}閲覧</p>
          </div>
          <div className={styles.profilePostCount}>
            <p>投稿{user.posts.length}件</p>
          </div>
          <div className={styles.profileLikeCount}>
            <p>{user.totalLikes} いいね</p>
          </div>
        </div>
      </div>
      <div className={styles.tabNavivation}>
        <div
          className={`${styles.tabNavivationItem} ${activeTab === 0 ? styles.active : ""}`}
          onClick={() => setActiveTab(0)}
        >
          <p>ホーム</p>
        </div>
        <div
          className={`${styles.tabNavivationItem} ${activeTab === 1 ? styles.active : ""}`}
          onClick={() => setActiveTab(1)}
        >
          <p>投稿一覧</p>
        </div>
        {session?.user &&
          renderFollowOrprofileEditButton(user, isFollowing, handleUnfollow, handleFollow)}
      </div>
      {activeTab === 0 && <UserHome user={user} />}
      {activeTab === 1 && <UserPostList user={user} />}
    </>
  );
};

const renderFollowOrprofileEditButton = (
  user: User,
  isFollowing: boolean,
  handleUnfollow: () => void,
  handleFollow: () => void
) => {
  console.log(user);
  console.log(`isFollowing`);
  if (user.isCurrentUser) {
    return (
      <>
        <div className={styles.followButton}>
          <button className={styles.followButtonText} onClick={handleUnfollow}>
            プロフィールを変更
          </button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots />
        </div>
      </>
    );
  }

  if (isFollowing) {
    return (
      <>
        <div className={styles.followButton}>
          <button className={styles.followButtonText} onClick={handleUnfollow}>
            フォローを外す
          </button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.followButton}>
        <button className={styles.followButtonText} onClick={handleFollow}>
          フォロー
        </button>
      </div>
      <div className={styles.threeDots}>
        <BsThreeDots />
      </div>
    </>
  );
};
