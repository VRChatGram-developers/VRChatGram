"use client";

import type React from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "./photo-card.module.scss";
import { MdOutlinePhoto } from "react-icons/md";
import { useSession } from "next-auth/react";
import { LoginFormModal } from "@/features/auth/components/login-form-modal";
import { useModal } from "@/provider/modal-provider";
import Link from "next/link";

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
  myId,
  ...rest
}: React.ComponentProps<"div"> & {
  postId: string;
  postName: string;
  postImageCount: number;
  userName: string;
  userImageUrl: string;
  isLiked: boolean;
  handleLikeOrUnlike: () => void;
  myId: string;
}) => {
  const { openModal, closeModal } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _, status } = useSession()

  const handleClickLikeOrUnlike = () => {
    if (status === "unauthenticated") {
      return openModal(<LoginFormModal onClose={closeModal} requiredAction="いいね" />);
    }

    handleLikeOrUnlike();
  };

  return (
    <div className={clsx(styles.postLikeContainer, className)} {...rest}>
      <Link href={`/posts/${postId}`} prefetch={true}>
        {children}
      </Link>
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
            <Link href={`/users/${myId}`} prefetch={true}>
              <Image
                src={userImageUrl || "/user-icon.png"}
                alt="new-post-image"
                className={styles.userInfoIcon}
                fill
              />
            </Link>
            <p className={styles.userInfoName}>
              <Link href={`/users/${myId}`} prefetch={true}>
                {userName}
              </Link>
            </p>
            <div className={styles.likesPostsItemLikeContents}>
              <div
                className={styles.likesPostsItemLikeItem}
                onClick={() => handleClickLikeOrUnlike()}
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
      </div>
    </div>
  );
};
