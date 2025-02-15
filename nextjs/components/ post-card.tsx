"use client";

import styles from "./styles/post-card.module.scss";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";

interface PostCardProps {
  postName: string;
  postImageUrl: string;
  postImageCount: number;
  userName: string;
  userImageUrl: string;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
}

export const PostCard = ({ postCardProps }: { postCardProps: PostCardProps }) => {
  const { postName, postImageUrl, postImageCount, userName, userImageUrl, isLiked, setIsLiked } = postCardProps;
  return (
    <div className={styles.likesPostsItem}>
      <Image
        src={postImageUrl}
        alt={`ピックアップ画像`}
        width={402}
        height={402}
        className={styles.likesPostsItemImage}
      />
      <div className={styles.likesPostsItemImageContents}>
        <MdOutlinePhoto className={styles.MdOutlinePhoto} />
        <p className={styles.likesPostsItemImageContentsText}>{postImageCount ?? 0}</p>
      </div>
      <div className={styles.userInfo}>
        <p className={styles.userInfoTitle}>{postName}</p>
        <div className={styles.userInfoContainer}>
          <Image src={userImageUrl} alt="new-post-image" width={40} height={40} />
          <p className={styles.userInfoName}>{userName}</p>
        </div>
      </div>
      <div className={styles.likesPostsItemLikeContents}>
        <div className={styles.likesPostsItemLikeItem} onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <Image src="/heart.png" alt="heart" width={40} height={40} />
          ) : (
            <Image src="/heart-outline.png" alt="heart" width={40} height={40} />
          )}
        </div>
      </div>
    </div>
  );
};
