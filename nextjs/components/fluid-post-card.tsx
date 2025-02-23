"use client";

import styles from "./styles/fluid-post-card.module.scss";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";
import { useRouter } from "next/navigation";

interface FluidPostCardProps {
  postId: string | bigint;
  userId: string | bigint;
  postName: string;
  postImageUrl: string;
  postImageCount: number;
  userName: string;
  userImageUrl?: string;
  isLiked: boolean;
  imageWidth: number;
  handleLikeOrUnlike: () => void;
}

export const FluidPostCard = ({ postCardProps }: { postCardProps: FluidPostCardProps }) => {
  const router = useRouter();

  const {
    postId,
    userId,
    postName,
    postImageUrl,
    postImageCount,
    userName,
    userImageUrl,
    isLiked,
    imageWidth,
    handleLikeOrUnlike,
  } = postCardProps;

  // 画像の幅によってクラスを設定
  const imageClass = imageWidth > 600 ? styles.wide : styles.tall;
  const handleForwardToPostDetail = (postId: string | bigint) => {
    const postIdString = typeof postId === "bigint" ? postId.toString() : postId;
    router.push(`/posts/${postIdString}`);
  };

  const handleForwardToUserDetail = (userId: string | bigint) => {
    const userIdString = typeof userId === "bigint" ? userId.toString() : userId;
    router.push(`/users/${userIdString}`);
  };

  return (
    <div className={`${styles.userPostsItemImageContainer} ${imageClass}`}>
      <Image
        src={
          Number(postId) % 2 === 0
            ? postImageUrl
            : Number(postId) % 3 === 0
            ? postImageUrl
            : postImageUrl
        }
        alt={`ピックアップ画像`}
        width={imageWidth}
        height={402}
        className={styles.userPostsItemImage}
        onClick={() => handleForwardToPostDetail(postId)}
      />
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
              src={userImageUrl || ""}
              alt="new-post-image"
              className={styles.userInfoIcon}
              fill
            />
            <p className={styles.userInfoName} onClick={() => handleForwardToUserDetail(userId)}>
              {userName}
            </p>
          </div>
        </div>
        <div className={styles.likesPostsItemLikeContents}>
          <div className={styles.likesPostsItemLikeItem} onClick={() => handleLikeOrUnlike()}>
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
