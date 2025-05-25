"use client";

import styles from "@/features/posts/styles/search-result.module.scss";
import { Post } from "@/features/posts/types/index";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdOutlineLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";
import { fetchPosts } from "@/features/posts/endpoint";
import { createQueryParams } from "@/utils/queryParams";
import { useSearchStore } from "@/libs/store/search-store";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { useRouter } from "next/navigation";
import { PhotoGallery } from "@/features/posts/photo-gallerys/photo-gallery";
import { Image as ImageType, User } from "@/features/posts/types";


type PhotoGalleryPost = {
  postId: string;
  show_sensitive_type: string;
  postImageCount: number;
  images: ImageType;
  isLiked: boolean;
  user: User;
  title: string;
  handleLikeOrUnlike: () => void;
};

export const SearchResult = ({
  posts,
  selectedTag,
  postCount,
  currentPage,
  totalPages,
  postImageUrlWithMaxLikes,
  title,
}: {
  posts: Post[];
  selectedTag: string;
  postCount: number;
  currentPage: number;
  totalPages: number;
  postImageUrlWithMaxLikes: string;
  title: string;
}) => {
  const [changedCurrentPage, setChangedCurrentPage] = useState(currentPage - 1);
  const [postList, setPostList] = useState<Post[]>(posts);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("newest"); // 選択されたソートオプションを管理
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>(
    Object.fromEntries(posts.map((post) => [post.id, post.is_liked]))
  );
  const [photoGalleryPosts, setPhotoGalleryPosts] = useState<PhotoGalleryPost[]>(
    posts.map((post) => ({
      postId: post.id,
      show_sensitive_type: post.show_sensitive_type,
      postImageCount: post.images.length,
      images: post.images[0],
      isLiked: likedPosts[post.id.toString()],
      user: post.user,
      title: post.title,
      handleLikeOrUnlike: () => handleLike(post.id.toString()),
    }))
  );
  const { handleLikeOrUnlike } = useLikePost();

  const { searchQuery } = useSearchStore();
  const router = useRouter();
  const searchSortOptions = [
    { label: "新着順", value: "newest" },
    { label: "人気順", value: "popular" },
    { label: "今週の人気順", value: "this_week_popular" },
  ];

  // タグ選択、検索時にAPIからのデータが変更されたら、postListを更新
  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  useEffect(() => {
    const updatedLikedPosts = Object.fromEntries(postList.map((post) => [post.id, post.is_liked]));
    if (JSON.stringify(updatedLikedPosts) !== JSON.stringify(likedPosts)) {
      setLikedPosts(updatedLikedPosts);
    }

    setPhotoGalleryPosts(
      postList.map((post) => ({
        postId: post.id,
        show_sensitive_type: post.show_sensitive_type,
        postImageCount: post.images.length,
        images: post.images[0],
        isLiked: likedPosts[post.id.toString()],
        user: post.user,
        title: post.title,
        handleLikeOrUnlike: () => handleLike(post.id),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postList, changedCurrentPage]);

  const handlePageChange = async (page: number) => {
    setChangedCurrentPage(page);
    const query = searchQuery.includes("#")
      ? createQueryParams({ tag: searchQuery, page: page + 1 })
      : createQueryParams({ title: searchQuery, page: page + 1 });
    router.push(`/posts?${query}`);
  };

  const handleLike = async (postId: string) => {
    const currentLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !currentLiked }));
    setPostList(
      postList.map((post) => (post.id == postId ? { ...post, is_liked: !currentLiked } : post))
    );
    try {
      await handleLikeOrUnlike(postId, currentLiked);
    } catch (error) {
      console.error(error);
      setLikedPosts((prev) => ({ ...prev, [postId]: currentLiked }));
    }
  };

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChangedCurrentPage(0);
    const query = searchQuery.includes("#")
      ? createQueryParams({ tag: searchQuery, page: 1, sort: e.target.value })
      : createQueryParams({ title: searchQuery, page: 1, sort: e.target.value });

    setSelectedSortOption(e.target.value);

    const postsList = await fetchPosts(query);
    if (typeof postsList === "string") {
      return <div>{postsList}</div>;
    }

    setPostList(postsList.posts);
  };

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.searchContainer}>
        <Image
          src={postImageUrlWithMaxLikes || ""}
          alt="logo"
          className={styles.searchThumbnail}
          width={260}
          height={260}
        />
        <div className={styles.searchDetailContainer}>
          <p className={styles.searchDetailTitle}>
            {title != "undefined" ? `${title}` : selectedTag === "#ALL" ? "ALL" : `${selectedTag}`}
          </p>
          <div className={styles.searchDetailContent}>
            <div>
              <p className={styles.searchPostCount}>投稿数: {postCount}</p>
            </div>
            <div className={styles.searchSortContainer}>
              <label className={styles.searchSortLabel}>
                <select
                  className={styles.searchSortSelect}
                  value={selectedSortOption}
                  onChange={handleSortChange}
                >
                  {searchSortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <PhotoGallery posts={photoGalleryPosts} />

      {/* ページネーションUI */}
      <div className={styles.pagination}>
        <button
          className={`${styles.paginationButton} ${styles.paginationMoveFirstButton}`}
          onClick={() => handlePageChange(0)}
        >
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`
              ${
                currentPage === i + 1
                  ? styles.paginationSelectedButton
                  : styles.paginationNotSelectButton
              }

                ${styles.paginationMoveButton}
                `}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`${styles.paginationButton} ${styles.paginationMoveLastButton}`}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          <MdOutlineLastPage className={styles.paginationButtonIcon} />
        </button>
      </div>
    </div>
  );
};
