"use client";

import styles from "./styles.module.scss";
import { User } from "@/features/users/types/user";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";
import { useState } from "react";
export const UserHome = ({ user }: { user: User }) => {
  const [isLiked, setIsLiked] = useState(false);

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
            <div key={post.id} className={styles.likesPostsItem}>
              <Image
                src="/home/new-post-image.png"
                alt={`ピックアップ画像`}
                width={402}
                height={402}
                className={styles.likesPostsItemImage}
              />
              <div className={styles.likesPostsItemImageContents}>
                <MdOutlinePhoto className={styles.MdOutlinePhoto} />
                <p className={styles.likesPostsItemImageContentsText}>{post.images.length ?? 0}</p>
              </div>
              <div className={styles.likesPostsItemLikeContents}>
                <div className={styles.likesPostsItemLikeItem} onClick={() => setIsLiked(!isLiked)}>
                  {isLiked ? (
                    <Image src="/heart.png" alt="heart" width={64} height={64} />
                  ) : (
                    <Image src="/heart-outline.png" alt="heart" width={64} height={64} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
