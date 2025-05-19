"use client";

import { ViewsPostList as ViewsPostListType } from "@/features/users/types/index";
import { PhotoGallery } from "@/components/photo-gallerys/photo-gallery";
import { useState, useEffect, useCallback, useMemo } from "react";
import useLikePost from "@/features/posts/hooks/use-like-post";
import { Post } from "@/features/users/types/index";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
import styles from "../styles/my-views-posts.module.scss";

export const ViewPostList = ({ viewsPostList }: { viewsPostList: ViewsPostListType }) => {
  const { handleLikeOrUnlike } = useLikePost();
  const totalPages = viewsPostList.totalPages;

  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});

  // 投稿データといいね状態を更新
  const updatePostsData = useCallback((page: number) => {
    const posts = viewsPostList.posts[page] || [];
    setCurrentPosts(posts);

    const newLikedPosts = Object.fromEntries(
      posts.map((post) => [post.id.toString(), post.isLiked])
    );
    setLikedPosts(newLikedPosts);
  }, []);

  useEffect(() => {
    updatePostsData(currentPage);
  }, [currentPage, updatePostsData]);

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
  }, [currentPosts, likedPosts]);
  return (
    <>
      <div className={styles.myViewsPostsContainer}>
        <div className={styles.myViewsPostsContainerTitle}>
          <p>閲覧履歴</p>
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
              key={i + 1}
              onClick={() => setCurrentPage(i)}
              className={`
              ${
                currentPage === i
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
