"use client";

import styles from "../styles/post-detail.module.scss";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import Image from "next/image";
import { PostDetail as PostDetailType } from "@/features/posts/types/index";
import { useState, useEffect, useRef } from "react";
import { OtherPostList } from "./other-post-list";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { useRouter } from "next/navigation";

export const PostDetail = ({ post }: { post: PostDetailType }) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedImage(post.images[0].url);
  }, [post]);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > 344); // 21.5rem = 344px
    }
  }, [post.description]);

  const [selectedImage, setSelectedImage] = useState(post.images[0].url);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedImage(post.images[currentIndex + 1].url);
  };

  const handleBeforeImage = () => {
    setCurrentIndex(currentIndex - 1);
    setSelectedImage(post.images[currentIndex - 1].url);
  };

  const handleForwardToUserDetail = (myId: string) => {
    router.push(`/users/${myId}`);
  };

  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      <div className={styles.postDetailContainer}>
        <div className={styles.postImageContainer}>
          <div className={styles.postMainImageContainer}>
            <Image
              src={selectedImage}
              alt="avatar"
              width={500}
              height={500}
              className={styles.postMainImage}
            />
            {currentIndex !== post.images.length - 1 && (
              <MdOutlineNavigateNext onClick={handleNextImage} />
            )}
            {currentIndex !== 0 && <MdOutlineNavigateBefore onClick={handleBeforeImage} />}
          </div>
          <div className={styles.postImageSubContainer}>
            {post.images.map((image, index) => (
              <div key={index} className={styles.postImageSub}>
                {image.url && (
                  <Image
                    src={image.url}
                    alt="avatar"
                    width={400}
                    height={400}
                    className={`${styles.postImage} ${
                      selectedImage == image.url
                        ? styles.postImageSubSelected
                        : styles.postImageSubNotSelected
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.postImageTagContainer}>
            {post.tags.map(({ tag }) => (
              <div key={tag.id} className={styles.postImageTag}>
                <button className={styles.postImageTagText}>#{tag.name}</button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.postDetailContent}>
          <div className={styles.postDetailInfoContainer}>
            <div className={styles.postDetailTextContaienr}>
              <p className={styles.postDetailText}>アバター写真</p>
            </div>
            <div className={styles.postDetailTitleContainer}>
              <p className={styles.postDetailTitle}>{post.title}</p>
            </div>
            <div className={styles.postDetailInformationContainer}>
              <div className={styles.postDetailInfomationViewContainer}>
                <FaRegEye size={24} />
                <p className={styles.postDetailInfomationView}>{post.view_count}View</p>
              </div>
              <div className={styles.postDetailInfomationLikeCountContainer}>
                <FaHeart size={24} />
                <p className={styles.postDetailInfomationLikeCount}>{post.likeCount}</p>
              </div>
            </div>
            <div className={styles.postDetailProfileContainer}>
              <div className={styles.postDetailProfileIconContainer}>
                <Image
                  src={post.user?.profile_url || "/posts/sample-user-icon.png"}
                  alt="avatar"
                  width={200}
                  height={200}
                  className={styles.postDetailProfileIcon}
                />
              </div>
              <div className={styles.postDetailProfileContent}>
                <div className={styles.postDetailProfileUserIdContainer}>
                  <p
                    className={styles.postDetailProfileUserId}
                    onClick={() => handleForwardToUserDetail(post.user.my_id)}
                  >
                    ID: {post.user?.my_id}
                  </p>
                </div>
                <div className={styles.postDetailProfileUserNameContainer}>
                  <p className={styles.postDetailProfileUserName}>{post.user?.name}</p>
                </div>
                <div className={styles.postDetailProfileSNSContainer}>
                  {post.user?.social_links.map((socialLink, index) => (
                    <div key={index} className={styles.postDetailProfileSNSItem}>
                      <a href={socialLink.platform_url} target="_blank" rel="noopener noreferrer">
                        {socialLink.platform_types === "x" && <FaXTwitter size={32} />}
                        {socialLink.platform_types === "discord" && <FaDiscord size={32} />}
                        {socialLink.platform_types === "other" && <GrPersonalComputer size={32} />}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.postDetailProfileDescriptionContainer}>
              <div className={styles.postDetailProfileDescriptionContent}>
                <p className={styles.postDetailProfileDescriptionTitle}>作品説明</p>
                <div className={styles.postDetailProfileDescription}>
                  <input
                    id="readMoreToggle"
                    className={styles.postDetailProfileDescriptionInput}
                    type="checkbox"
                    checked={isExpanded}
                    onChange={() => setIsExpanded(!isExpanded)}
                  />
                  <p
                    ref={textRef}
                    className={`${styles.postDetailProfileDescriptionText} ${
                      isExpanded ? styles.expanded : ""
                    }`}
                  >
                    {post.description}
                  </p>
                  {isOverflowing && !isExpanded && (
                    <label
                      htmlFor="readMoreToggle"
                      className={styles.postDetailProfileDescriptionLabel}
                    >
                      ...続きを読む
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.postDetailProfileBoothContainer}>
              <div className={styles.postDetailProfileBoothTitleContainer}>
                <p className={styles.postDetailProfileBoothTitle}>Booth購入リスト</p>
              </div>
              <div className={styles.postDetailProfileBoothContent}>
                {post.booth_items.map((boothItem) => (
                  <div className={styles.postDetailProfileBoothItem} key={boothItem.id}>
                    <Image
                      src={boothItem.booth.image.toString()}
                      alt="avatar"
                      width={200}
                      height={200}
                      className={styles.postDetailProfileBoothImage}
                    />
                    <div className={styles.postDetailProfileBoothInfomationContainer}>
                      <p className={styles.postDetailProfileBoothInfomationTitle}>
                        {boothItem.booth.title}
                      </p>
                      <p className={styles.postDetailProfileBoothInfomation}>
                        {boothItem.booth.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OtherPostList post={post} setIsLiked={setIsLiked} isLiked={isLiked} />
    </>
  );
};
