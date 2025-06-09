"use client";

import styles from "@/features/users/styles/user-post-list.module.scss";
import { User, Post } from "@/features/users/types/index";
import { useState, useEffect, useCallback, useMemo } from "react";
import { MdOutlineLastPage, MdOutlineFirstPage } from "react-icons/md";
import { PhotoGallery } from "@/features/posts/photo-gallerys/photo-gallery";
import useLikePost from "@/features/posts/hooks/use-like-post";

export const UserPostList = ({ user }: { user: User }) => {
  const { handleLikeOrUnlike } = useLikePost();
  const totalPages = user.posts.length;

  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});

  // 投稿データといいね状態を更新
  const updatePostsData = useCallback((page: number) => {
    const posts = user.posts[page] || [];
    setCurrentPosts(posts);

    const newLikedPosts = Object.fromEntries(
      posts.map((post) => [post.id.toString(), post.isLiked])
    );
    setLikedPosts(newLikedPosts);
  }, [user]);

  useEffect(() => {
    updatePostsData(currentPage);
  }, [currentPage, updatePostsData]);

  const handleLike = async (postId: string) => {
    const isCurrentlyLiked = likedPosts[postId]; 
    setLikedPosts((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));
    handleLikeOrUnlike(postId, isCurrentlyLiked);
  };

  const photoList = useMemo(() => {
    return currentPosts.map((post) => ({
      title: post.title,
      show_sensitive_type: post.show_sensitive_type,
      images: post.images[0],
      user: {
        id: user.id,
        name: user.name,
        my_id: user.my_id,
        profile_url: user.profile_url,
      },
      postId: post.id.toString(),
      postName: post.title,
      postImageCount: post.images.length,
      isLiked: likedPosts[post.id.toString()],
      handleLikeOrUnlike: () => handleLike(post.id.toString()),
    }));
  }, [currentPosts, likedPosts, user]);

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.userPostsTitle}>
        <p>投稿一覧</p>
      </div>

      <PhotoGallery posts={photoList} />

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
  );
};
