"use client";

import styles from "./styles/post-card.module.scss";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";
import { useRouter } from "next/navigation";

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

const sampleUserImageUrl = "/posts/sample-user-icon.png";
const samplePostImageUrl = "/posts/sample-icon.png";

export const PostCard = ({
  postCardProps,
}: {
  postCardProps: PostCardProps;
}) => {
  const router = useRouter();

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

  return (
    <div className={styles.likesPostsItem}>
      <Image
        src={postImageUrl || samplePostImageUrl}
        alt={`ピックアップ画像`}
        width={402}
        height={402}
        className={styles.likesPostsItemImage}
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
              src={userImageUrl || sampleUserImageUrl}
              alt="new-post-image"
              className={styles.userInfoIcon}
              fill
            />
            <p className={styles.userInfoName} onClick={() => handleForwardToUserDetail(myId)}>
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
