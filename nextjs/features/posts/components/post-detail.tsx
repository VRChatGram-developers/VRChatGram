"use client";

import styles from "../styles/post-detail.module.scss";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import Image from "next/image";
import { PostDetail as PostDetailType } from "@/features/posts/types/index";
import { useState } from "react";
import { OtherPostList } from "./other-post-list";
export const PostDetail = ({ post }: { post: PostDetailType }) => {
  console.log(post);
  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      <div className={styles.postDetailContainerFirst}>
        <div className={styles.postImageContainer}>
          <div className={styles.postImage}>
            <p>写真</p>
          </div>
        </div>
        <div className={styles.postContentContainer}>
          <div className={styles.postContentLabel}>
            <p>アバター写真</p>
          </div>
          <div className={styles.postContentTitle}>
            <p>{post.title}</p>
          </div>
          <div className={styles.postContentIcons}>
            <div className={styles.iconItem}>
              <FaRegEye className={styles.eyeIcon} />
              <p>{post.view_count}View</p>
            </div>
            <div className={styles.iconHeart}>
              <FaHeart className={styles.heartIcon} />
              <p>{post.likeCount}</p>
            </div>
          </div>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoImage}>
              <Image
                src="/posts/sample-icon.png"
                alt="avatar"
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className={styles.userInfoContent}>
              <div className={styles.userId}>
                <p>ID: {post.user?.my_id}</p>
              </div>
              <div className={styles.userInfoName}>
                <p>{post.user?.name}</p>
              </div>
              <div className={styles.userInfoIcons}>
                <FaXTwitter className={styles.twitterIcon} />
                <FaDiscord className={styles.discordIcon} />
              </div>
            </div>
          </div>
          <div className={styles.postContentDescription}>
            <div className={styles.postContentDescriptionText}>
              <p>作品説明</p>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.postDetailContainerSecond}>
        <div className={styles.postImageListContainer}>
          <div className={styles.postImageList}>
            {[...Array(4)].map((_, index) => (
              <div className={styles.postImageItem} key={index}>
                <Image
                  src="/home/femailtag-icon.png"
                  alt="avatar"
                  width={100}
                  height={100}
                  className={styles.postImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.tagList}>
            {[...Array(10)].map((_, index) => (
              <div key={index} className={styles.tagItem}>
                <button>#{index}</button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.postBoothItemContainer}>
          <div className={styles.postBoothDescription}>
            <p>Booth購入リスト</p>
          </div>
          <div className={styles.postBoothList}>
            {post.booth_items.map((boothItem) => (
              <div className={styles.postBoothItem} key={boothItem.id}>
                <Image
                  src={boothItem.booth.image.url}
                  alt="avatar"
                  width={100}
                  height={100}
                  className={styles.postImage}
                />
                <div className={styles.postBoothItemContent}>
                  <p>{boothItem.booth.title}</p>
                  <p>{boothItem.booth.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OtherPostList post={post} setIsLiked={setIsLiked} isLiked={isLiked} />
    </>
  );
};
