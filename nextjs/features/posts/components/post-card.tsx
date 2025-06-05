"use client";

import styles from "@/features/posts/styles/post-card.module.scss";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";
import { useSession } from "next-auth/react";
import { LoginFormModal } from "@/features/auth/components/login-form-modal";
import { useModal } from "@/provider/modal-provider";
import Link from "next/link";
type PostCardProps = {
  postId: string | bigint;
  myId: string | bigint;
  postName: string;
  postImageUrl: string | null;
  postImageCount: number;
  userName: string;
  userImageUrl: string | null;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  handleLikeOrUnlike: () => void;
};

const sampleUserImageUrl = "/user-icon.png";
const samplePostImageUrl = "/posts/sample-icon.png";

export const PostCard = ({ postCardProps }: { postCardProps: PostCardProps }) => {
  const { openModal, closeModal } = useModal();

  const {
    postId,
    myId,
    postName,
    postImageUrl,
    postImageCount,
    userName,
    userImageUrl,
    isLiked,
    handleLikeOrUnlike,
  } = postCardProps;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _, status } = useSession();
  const handleClickLikeOrUnlike = () => {
    
    if (status === "unauthenticated") {
      return openModal(<LoginFormModal onClose={closeModal} requiredAction="いいね" />);
    }

    handleLikeOrUnlike();
  };

  return (
    <div className={styles.likesPostsItem}>
      <Link href={`/posts/${postId}`} prefetch={true}>
        <Image
          src={postImageUrl || samplePostImageUrl}
          alt={`ピックアップ画像`}
          width={402}
          height={402}
          className={styles.likesPostsItemImage}
          unoptimized
          priority
        />
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
            <Image
              src={userImageUrl || sampleUserImageUrl}
              alt="new-post-image"
              className={styles.userInfoIcon}
              fill
              unoptimized
            />
            <p className={styles.userInfoName}>
              <Link href={`/users/${myId}`} prefetch={true}>{userName}</Link>
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
