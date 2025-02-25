"use client";

import styles from "./styles/post-card.module.scss";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";
import { useRouter } from "next/navigation";

interface PostCardProps {
  postId: string | bigint;
  userId: string | bigint;
  postName: string;
  postImageUrl: string;
  postImageCount: number;
  userName: string;
  userImageUrl: string;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  handleLikeOrUnlike: () => void;
}

export const PostCard = ({
  postCardProps,
}: {
  postCardProps: PostCardProps;
}) => {
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
    handleLikeOrUnlike,
  } = postCardProps;

  const handleForwardToPostDetail = (postId: string | bigint) => {
    console.log(postId);
    const postIdString =
      typeof postId === "bigint" ? postId.toString() : postId;
    router.push(`/posts/${postIdString}`);
  };

  const handleForwardToUserDetail = (userId: string | bigint) => {
    const userIdString =
      typeof userId === "bigint" ? userId.toString() : userId;
    router.push(`/users/${userIdString}`);
  };

  return (
    <div className={styles.likesPostsItem}>
      <Image
        src={postImageUrl}
        alt={`ピックアップ画像`}
        width={402}
        height={402}
        className={styles.likesPostsItemImage}
        onClick={() => handleForwardToPostDetail(postId)}
      />
      <div className={styles.likesPostsItemImageContents}>
        <MdOutlinePhoto className={styles.MdOutlinePhoto} />
        <p className={styles.likesPostsItemImageContentsText}>
          {postImageCount ?? 0}
        </p>
      </div>
      <div className={styles.userInfoLikeContainer}>
        <div className={styles.userInfo}>
          <p className={styles.userInfoTitle}>{postName}</p>
          <div className={styles.userInfoContainer}>
            <Image
              src={userImageUrl}
              alt="new-post-image"
              className={styles.userInfoIcon}
              fill
            />
            <p
              className={styles.userInfoName}
              onClick={() => handleForwardToUserDetail(userId)}
            >
              {userName}
            </p>
          </div>
        </div>
        <div className={styles.likesPostsItemLikeContents}>
          <div
            className={styles.likesPostsItemLikeItem}
            onClick={() => handleLikeOrUnlike()}
          >
            {isLiked ? (
              <Image
                src="/heart-outline.png"
                alt="heart"
                className={styles.likesIcon}
                fill
              />
            ) : (
              <Image
                src="/heart.png"
                alt="heart"
                className={styles.likesIcon}
                fill
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
