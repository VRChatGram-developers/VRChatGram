"use client";

import { FavoritePostList as FavoritePostListType } from "@/features/users/types/index";
import { PhotoGallery } from "@/features/posts/photo-gallerys/photo-gallery";
import { useState, useEffect, useCallback, useMemo } from "react";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { Post } from "@/features/users/types/index";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
import styles from "../styles/favorite-post-list.module.scss";

export const FavoritePostList = ({ favoritePostList }: { favoritePostList: FavoritePostListType }) => {
  const { handleLikeOrUnlike } = useLikePost();
  const totalPages = favoritePostList.totalPages;

  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});

  // 投稿データといいね状態を更新
  const updatePostsData = useCallback((page: number) => {
    const posts = favoritePostList.posts[page] || [];
    setCurrentPosts(posts);

    const newLikedPosts = Object.fromEntries(
      posts.map((post) => [post.id.toString(), post.isLiked])
    );
    setLikedPosts(newLikedPosts);
  }, []);

  useEffect(() => {
    updatePostsData(currentPage);
  }, [currentPage, updatePostsData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLike = async (postId: string) => {
    const isCurrentlyLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));
    try {
      await handleLikeOrUnlike(postId, isCurrentlyLiked);
    } catch (error) {
      console.error(error);
      setLikedPosts((prev) => ({ ...prev, [postId]: isCurrentlyLiked }));
    }
  };

  const photoList = useMemo(() => {
    return currentPosts.map((post) => ({
      title: post.title,
      show_sensitive_type: post.show_sensitive_type,
      images: post.images[0],
      user: {
        id: post.user.id,
        name: post.user.name,
        my_id: post.user.my_id,
        profile_url: post.user.profile_url,
      },
      postId: post.id.toString(),
      postName: post.title,
      postImageCount: post.images.length,
      isLiked: likedPosts[post.id.toString()],
      handleLikeOrUnlike: () => handleLike(post.id.toString()),
    }));
  }, [currentPosts, handleLike, likedPosts]);
  return (
    <>
      <div className={styles.favoritePostListContainer}>
        <div className={styles.favoritePostListContainerTitle}>
          <p>良いね一覧</p>
        </div>
        <div>
          <PhotoGallery posts={photoList} />
        </div>

        <div className={styles.pagination}>
          <button
            className={`${styles.paginationButton} ${styles.paginationMoveFirstButton}`}
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            <MdOutlineFirstPage className={styles.paginationButtonIcon} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`
              ${currentPage === i
                ? styles.paginationSelectedButton
                : styles.paginationNotSelectButton}

                ${styles.paginationMoveButton}
                `
            }
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`${styles.paginationButton} ${styles.paginationMoveLastButton}`}
            onClick={() => setCurrentPage(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
          >
            <MdOutlineLastPage className={styles.paginationButtonIcon} />
          </button>
        </div>
      </div>
    </>
  );
};
