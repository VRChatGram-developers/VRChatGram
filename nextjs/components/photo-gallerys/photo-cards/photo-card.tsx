"use client";

import type React from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "./photo-card.module.scss";
import { MdOutlinePhoto } from "react-icons/md";
import { useRouter } from "next/navigation";

export const PhotoCard = ({
  className,
  children,
  postId,
  postName,
  postImageCount,
  userName,
  userImageUrl,
  isLiked,
  handleLikeOrUnlike,
  ...rest
}: React.ComponentProps<"div"> & {
  postId: string;
  postName: string;
  postImageCount: number;
  userName: string;
  userImageUrl: string;
  isLiked: boolean;
  handleLikeOrUnlike: () => void;
}) => {
  const router = useRouter();

  const handleForwardToPostDetail = (postId: string | bigint) => {
    const postIdString = typeof postId === "bigint" ? postId.toString() : postId;
    router.push(`/posts/${postIdString}`);
  };

  return (
    <div className={clsx(styles.postLikeContainer, className)} {...rest}>
      <div onClick={() => handleForwardToPostDetail(postId)}>{children}</div>
      {postImageCount > 1 && (
        <div className={styles.likesPostsItemImageContents}>
          <MdOutlinePhoto className={styles.MdOutlinePhoto} />
          <p className={styles.likesPostsItemImageContentsText}>{postImageCount}</p>
        </div>
      )}
      <div className={styles.userInfoLikeContainer}>
        <div className={styles.userInfo}>
          <p className={styles.userInfoTitle}>{postName}</p>
          <div className={styles.userInfoContainer}>
            <Image
              src={userImageUrl || "/users/profile-icon-sample.png"}
              alt="new-post-image"
              className={styles.userInfoIcon}
              fill
            />
            <p className={styles.userInfoName}>{userName}</p>
          </div>
        </div>
        <div className={styles.likesPostsItemLikeContents}>
          <div
            className={styles.likesPostsItemLikeItem}
            onClick={() => handleLikeOrUnlike()}
          >
            {isLiked ? (
              <Image src="/heart-outline.png" alt="heart" className={styles.likesIcon} fill />
            ) : (
              <Image src="/heart.png" alt="heart" className={styles.likesIcon} fill />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
