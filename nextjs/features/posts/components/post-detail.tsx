"use client";

import styles from "../styles/post-detail.module.scss";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import Image from "next/image";
import { PostDetail as PostDetailType } from "@/features/posts/types/index";
import { useState, useEffect } from "react";
import { OtherPostList } from "./other-post-list";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

export const PostDetail = ({ post }: { post: PostDetailType }) => {
  console.log(post);

  const imageList = [
    "https://images.vrcpic.com/photos/394/bc1b8c4b89151375fb0ab1bb0f6977e8.jpg",
    "https://images.vrcpic.com/photos/394/468f203d4a7221881e074343e835a513.jpg",
    "https://images.vrcpic.com/photos/394/4f3f8002e390b4abbe6da046ffaba5ff.jpg",
    "https://images.vrcpic.com/photos/394/bc1b8c4b89151375fb0ab1bb0f6977e8.jpg",
  ];

  useEffect(() => {
    setSelectedImage(post.images[0].url);
  }, [post]);

  const [selectedImage, setSelectedImage] = useState(post.images[0].url);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedImage(post.images[currentIndex + 1].url);
  };

  const handleBeforeImage = () => {
    setCurrentIndex(currentIndex - 1);
    setSelectedImage(imageList[currentIndex - 1]);
  };

  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      <div className={styles.postDetailContainerFirst}>
        <div className={styles.postImageContainer}>
          <div className={styles.postImage}>
            <Image
              src={selectedImage}
              alt="avatar"
              width={100}
              height={100}
              className={styles.postImage}
            />
            {currentIndex !== imageList.length - 1 && (
              <MdOutlineNavigateNext
                className={styles.nextIcon}
                onClick={handleNextImage}
                style={{ opacity: currentIndex === imageList.length - 1 ? 0 : 1 }}
              />
            )}
            {currentIndex !== 0 && (
              <MdOutlineNavigateBefore
                className={styles.beforeIcon}
                onClick={handleBeforeImage}
                style={{ opacity: currentIndex === 0 ? 0 : 1 }}
              />
            )}
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
            {post.images.map((image, index) => (
              <div className={styles.postImageItem} key={index}>
                {image.url && (
                  <Image
                    src={image.url}
                    alt="avatar"
                    width={100}
                    height={100}
                    className={
                      selectedImage == image.url ? styles.postImageSelected : styles.postImage
                    }
                    onClick={() => setSelectedImage(image.url)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.tagList}>
            {post.tags.map((tag) => (
              <div key={tag.id} className={styles.tagItem}>
                <button>#{tag.name}</button>
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
