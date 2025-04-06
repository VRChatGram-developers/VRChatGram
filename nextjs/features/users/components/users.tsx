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

  const BackgeoundImageURL =
    "https://i0.wp.com/bussan-b.info/wp-content/uploads/2021/03/%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88.jpg?resize=1024%2C576&ssl=1";

  const IconImageURL =
    "https://pbs.twimg.com/media/GijziWvbYAAfm3D?format=jpg&name=4096x4096";

  return (
    <>
      <div
        className={styles.profileHeaderContainer}
        style={{ backgroundImage: `url(${user.header_url || BackgeoundImageURL})` }}
      >
        <div className={styles.profileHeaderContent}>
          <div className={styles.profileHeaderUserIconContainer}>
            <Image
              src={user.profile_url || IconImageURL}
              alt="profile"
              width={260}
              height={260}
              className={styles.profileHeaderUserIcon}
            />
          </div>
          <div className={styles.profuleHeaderInfomationContainer}>
            <div className={styles.profileUserNameContainer}>
              <p className={styles.profileUserNameText}>{user.name}</p>
            </div>
            <div className={styles.profuleUserStatusContainer}>
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
        </div>
      </div>

      <div className={styles.tabNavigationConatiner}>
        <div className={styles.tabNavigationContent}>
          <div
            className={`${styles.tabNavigationItem} ${activeTab === 0 ? styles.active : ""}`}
            onClick={() => setActiveTab(0)}
          >
            <p className={styles.tabNavigationItemText}>ホーム</p>
          </div>
          <div
            className={`${styles.tabNavigationItem} ${activeTab === 1 ? styles.active : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <p className={styles.tabNavigationItemText}>投稿一覧</p>
          </div>
        </div>

        <div className={styles.tabNavigationButtonContainer}>
          {session?.user &&
            renderFollowOrprofileEditButton(user, isFollowing, handleUnfollow, handleFollow)}
        </div>
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
        <div className={styles.editProfileButtonContainer}>
          <button className={styles.editProfileButton} onClick={handleUnfollow}>
            プロフィールを変更
          </button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots size={24} />
        </div>
      </>
    );
  }

  if (isFollowing) {
    return (
      <>
        <div className={styles.unFollowButtonContainer}>
          <button className={styles.unFollowButton} onClick={handleUnfollow}>
            フォローを外す
          </button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots size={24} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.followButtonContainer}>
        <button className={styles.followButton} onClick={handleFollow}>
          フォロー
        </button>
      </div>
      <div className={styles.threeDots}>
        <BsThreeDots size={24} />
      </div>
    </>
  );
};
