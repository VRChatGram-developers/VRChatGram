"use client";

import type React from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "./photo-card.module.scss";
import { MdOutlinePhoto } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SignInFormModal } from "@/features/auth/components/sign-in-form-modal";
import { useModal } from "@/provider/modal-provider";

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
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _, status } = useSession();

  const handleForwardToPostDetail = (postId: string | bigint) => {
    const postIdString = typeof postId === "bigint" ? postId.toString() : postId;
    router.prefetch(`/posts/${postIdString}`);
    router.push(`/posts/${postIdString}`);
  };

  const handleForwardToUserDetail = (myId: string | bigint) => {
    const myIdString = typeof myId === "bigint" ? myId.toString() : myId;
    router.prefetch(`/users/${myIdString}`);
    router.push(`/users/${myIdString}`);
  };

  const handleClickLikeOrUnlike = () => {
    if (status === "unauthenticated") {
      return openModal(<SignInFormModal onClose={closeModal} />);
    }

    handleLikeOrUnlike();
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
          <div className={styles.userInfoContainer} onClick={() => handleForwardToUserDetail(myId)}>
            <Image
              src={userImageUrl || "/user-icon.png"}
              alt="new-post-image"
              className={styles.userInfoIcon}
              fill
            />
            <p className={styles.userInfoName}>{userName}</p>
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
