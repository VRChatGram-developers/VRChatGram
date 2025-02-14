"use client";

import styles from "../styles/other-post-list.module.scss";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";
import { PostDetail as PostDetailType } from "@/features/posts/types/index";
export const OtherPostList = ({post, setIsLiked, isLiked}: {post: PostDetailType, setIsLiked: (isLiked: boolean) => void, isLiked: boolean}) => {
  return (
    <div className={styles.otherPosts}>
        <div className={styles.otherPostsTitle}>
          <p>「{post.user?.name}」他の投稿</p>
        </div>
        <div className={styles.otherPostsList}>
            {post.otherPostList.map((post) => (
              <div key={post.id} className={styles.otherPostsItem}>
                <Image
                  src="/home/new-post-image.png"
                  alt={`ピックアップ画像`}
                  width={402}
                  height={402}
                  className={styles.otherPostsItemImage}
                />
                <div className={styles.otherPostsItemImageContents}>
                  <MdOutlinePhoto className={styles.MdOutlinePhoto} />
                  <p className={styles.otherPostsItemImageContentsText}>{0}</p>
                </div>
                <div className={styles.otherPostsItemLikeContents}>
                  <div className={styles.otherPostsItemLikeItem} onClick={() => setIsLiked(!isLiked)}>
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
  );
};