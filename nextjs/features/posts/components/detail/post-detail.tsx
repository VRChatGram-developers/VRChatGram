"use client";

import styles from "@/features/posts/styles/post-detail.module.scss";
import { FaRegEye } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import Image from "next/image";
import {
  PostDetail as PostDetailType,
  OtherPost,
  RecommendPost,
} from "@/features/posts/types/index";
import { useState, useEffect, useRef } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { useRouter } from "next/navigation";
import useLikePost from "../../hooks/use-like-post";
import { useSession } from "next-auth/react";
import { LoginFormModal } from "@/features/auth/components/login-form-modal";
import { useModal } from "@/provider/modal-provider";
import { useSearchStore } from "@/libs/store/search-store";
import { createQueryParams } from "@/utils/queryParams";
import { addViewCountToPost } from "../../endpoint";
import { BsThreeDots } from "react-icons/bs";
import { PostEditForm } from "../form/post-edit-form";
import dynamic from "next/dynamic";
import { ZoomPostImage } from "../zoom-post-image";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { DeletePostConfirm } from "./delete-post-confirm";
import { PhotoType } from "@/features/posts/types";

const OtherPostList = dynamic(
  () =>
    import("@/features/posts/components/detail/other-post-list").then((mod) => mod.OtherPostList),
  { ssr: false }
);
const RecommendPostList = dynamic(
  () =>
    import("@/features/posts/components/detail/recommend-post-list").then(
      (mod) => mod.RecommendPostList
    ),
  { ssr: false }
);

export const PostDetail = ({
  post,
  otherPostList,
  recommendPostList,
}: {
  post: PostDetailType;
  otherPostList: OtherPost[];
  recommendPostList: RecommendPost[];
}) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);
  const { handleLikeOrUnlike } = useLikePost();
  const { openModal, closeModal } = useModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _, status } = useSession();
  const { setSearchQuery } = useSearchStore();
  const [isDropdownEditMenuOpen, setIsDropdownEditMenuOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [photoTypes, setPhotoType] = useState<PhotoType[]>();

  const handleDropdownMenuOpen = () => {
    setIsDropdownEditMenuOpen(!isDropdownEditMenuOpen);
  };

  useEffect(() => {
    addViewCountToPost(post.id.toString());
  }, []);

  useEffect(() => {
    const hasPhotoTypes = post.post_photo_types.length > 0;

    const photoTypes = hasPhotoTypes
      ? post.post_photo_types.map((type) => type.photo_type)
      : [{ id: "00000000-0000-0000-0000-000000000000", name: "アバター写真" }];

    setPhotoType(photoTypes);
  }, [post.post_photo_types]);

  useEffect(() => {
    setSelectedImage(post.images[0].url);
    setIsLiked(post.isLiked);
    setLikeCount(post.likeCount);
  }, [post, setIsLiked, setLikeCount]);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > 344); // 21.5rem = 344px
    }
  }, [post.description]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownEditMenuOpen(false);
      }
    };

    if (isDropdownEditMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownEditMenuOpen, setIsDropdownEditMenuOpen]);

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

  const handleClickLikeOrUnlike = async () => {
    if (status === "unauthenticated") {
      return openModal(<LoginFormModal onClose={closeModal} requiredAction="いいね" />);
    }

    setIsLiked(!isLiked);
    setLikeCount(likeCount + (isLiked ? -1 : 1));
    await handleLikeOrUnlike(post.id.toString(), isLiked);
  };

  const selectImage = (url: string, index: number) => {
    setSelectedImage(url);
    setCurrentIndex(index);
  };

  const getPlatformIcon = (type: string) => {
    switch (type) {
      case "x":
        return <FaXTwitter size={32} />;
      case "discord":
        return <FaDiscord size={32} />;
      default:
        return <GrPersonalComputer size={32} />;
    }
  };

  const redirectToPostSearchListByTagName = (tagName: string) => {
    setSearchQuery(`#${tagName}`);
    router.push(`/posts?${createQueryParams({ tag: tagName, page: 1 })}`);
  };

  return (
    <>
      {isZoomed && <ZoomPostImage imageUrl={selectedImage} onClose={() => setIsZoomed(false)} />}
      <div className={styles.postDetailContainer}>
        <div className={styles.postImageContainer}>
          <div className={styles.postMainImageContainer}>
            <Image
              src={selectedImage}
              alt="avatar"
              width={500}
              height={500}
              quality={100}
              className={styles.postMainImage}
              unoptimized
              onClick={() => setIsZoomed(true)}
            />
            {currentIndex !== post.images.length - 1 && (
              <MdOutlineNavigateNext
                onClick={handleNextImage}
                size={48}
                className={styles.navigateNextStyle}
              />
            )}
            {currentIndex !== 0 && (
              <MdOutlineNavigateBefore
                onClick={handleBeforeImage}
                size={48}
                className={styles.navigateBeforeStyle}
              />
            )}
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
                    onClick={() => selectImage(image.url, index)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.postImageTagContainer}>
            {post.tags.map(({ tag }) => (
              <div key={tag.id} className={styles.postImageTag}>
                <button
                  className={styles.postImageTagText}
                  onClick={() => redirectToPostSearchListByTagName(tag.name)}
                >
                  #{tag.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.postDetailContent}>
          <div className={styles.postDetailInfoContainer}>
            <div className={styles.postDetailTextContaienr}>
              {photoTypes?.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className={
                      name === "アバター写真" ? styles.postDetailAvatar : styles.postDetailWorld
                    }
                  >
                    {name}
                  </div>
                );
              })}
            </div>
            <div className={styles.postDetailTitleContainer}>
              <p className={styles.postDetailTitle}>{post.title}</p>
            </div>
            <div className={styles.postDetailInformationContainer}>
              <div className={styles.postDetailInfomationViewContainer}>
                <FaRegEye size={24} className={styles.postDetailInfomationViewIcon} />
                <p className={styles.postDetailInfomationView}>{post.view_count}View</p>
              </div>
              <div className={styles.postDetailInfomationLikeCountContainer}>
                {isLiked ? (
                  <Image
                    src="/heart-outline.png"
                    alt="heart"
                    width={18}
                    height={18}
                    onClick={handleClickLikeOrUnlike}
                  />
                ) : (
                  <Image
                    src="/before-good-for-post-detail.png"
                    alt="heart"
                    width={18}
                    height={18}
                    onClick={handleClickLikeOrUnlike}
                  />
                )}
                <p className={styles.postDetailInfomationLikeCount}>{likeCount}</p>
              </div>
              {post.isMyPost && (
                <div className={styles.postDetailDropdownMenuContainer}>
                  <BsThreeDots size={24} onClick={handleDropdownMenuOpen} />
                  {isDropdownEditMenuOpen && (
                    <div ref={menuRef} className={styles.menuContainer}>
                      <div
                        className={styles.menuItem}
                        onClick={() => {
                          openModal(<PostEditForm onClose={closeModal} post={post} />);
                        }}
                      >
                        <div className={styles.postDetailEditContainer}>
                          <FiEdit size={16} className={styles.postDetailEditIcon} />
                          <p className={styles.postDetailEditText}>編集</p>
                        </div>
                      </div>
                      <div
                        className={styles.menuItem}
                        onClick={() => {
                          openModal(
                            <DeletePostConfirm postId={post.id.toString()} onClose={closeModal} />
                          );
                        }}
                      >
                        <div className={styles.postDetailEditContainer}>
                          <FiTrash size={16} className={styles.postDetailEditIcon} />
                          <p className={styles.postDetailEditText}>削除</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.postDetailProfileContainer}>
              <div className={styles.postDetailProfileIconContainer}>
                <Image
                  src={post.user?.profile_url || "/user-icon.png"}
                  alt="avatar"
                  width={200}
                  height={200}
                  className={styles.postDetailProfileIcon}
                  onClick={() => handleForwardToUserDetail(post.user.my_id)}
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
                  <p
                    className={styles.postDetailProfileUserName}
                    onClick={() => handleForwardToUserDetail(post.user.my_id)}
                  >
                    {post.user?.name}
                  </p>
                </div>
                <div className={styles.postDetailProfileSNSContainer}>
                  {post.user?.social_links.map((socialLink, index) => (
                    <div key={index} className={styles.postDetailProfileSNSItem}>
                      <a href={socialLink.platform_url} target="_blank" rel="noopener noreferrer">
                        {getPlatformIcon(socialLink.platform_types)}
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
            {post.booth_items.length > 0 && (
              <div className={styles.postDetailProfileBoothContainer}>
                <div className={styles.postDetailProfileBoothTitleContainer}>
                  <p className={styles.postDetailProfileBoothTitle}>Booth購入リスト</p>
                </div>
                <div className={styles.postDetailProfileBoothContent}>
                  {post.booth_items.map((boothItem) => (
                    <div
                      className={styles.postDetailProfileBoothItem}
                      key={boothItem.id}
                      onClick={() => {
                        window.open(boothItem.booth.url, "_blank");
                      }}
                    >
                      <Image
                        src={boothItem.booth.image || "/user-icon.png"}
                        alt="avatar"
                        width={200}
                        height={200}
                        className={styles.postDetailProfileBoothImage}
                        unoptimized
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
            )}
          </div>
        </div>
      </div>

      <OtherPostList
        userOtherPostList={otherPostList}
        setIsLiked={setIsLiked}
        userName={post.user.name}
      />
      <RecommendPostList initialRecommendPostList={recommendPostList} setIsLiked={setIsLiked} />
    </>
  );
};
