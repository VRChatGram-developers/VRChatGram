"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import { User } from "@/features/users/types/user";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { UserHome } from "../user-home/user-home";
export const Users = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState(0);
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

        <div className={styles.followButton}>
          <button className={styles.followButtonText}>フォロー</button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots />
        </div>
      </div>
      {activeTab === 0 && <UserHome user={user} />}
    </>
  );
};
