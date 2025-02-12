"use client";

import styles from "./styles.module.scss";
import { Post } from "@/features/posts/types/post";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";
import { fetchPosts } from "@/features/posts/endpoint";
export const PostList = ({ posts, selectedTag }: { posts: Post[][]; selectedTag: string }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postList, setPostList] = useState<Post[][]>([]);
  const totalPages = posts.length;
  const currentPosts = posts[currentPage] || [];
  console.log(currentPosts);
  console.log(currentPage);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    setPostList(await fetchPosts(page));
  };

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.mostPopularPost}>
        <Image src="/posts/sample-icon.png" alt="logo" width={260} height={260} />
        <p className={styles.mostPopularPostTitle}>{selectedTag}</p>
        <p className={styles.mostPopularPostCount}>投稿数: 100</p>
      </div>
      <div>
        <ul className={styles.userPostsList}>
          {(currentPosts || postList).map((post) => (
            <li key={post.id} className={styles.userPostsItem}>
              <div className={styles.userPostsItemImageContainer}>
                <Image
                  src={
                    Number(post.id) % 2 === 0
                      ? "/users/post-sample-image.png"
                      : Number(post.id) % 3 === 0
                      ? "/users/post-sample-image3.png"
                      : "/users/post-sample-image2.png"
                  }
                  alt={`ピックアップ画像`}
                  width={Number(post.id) % 2 === 0 ? 804 : Number(post.id) % 3 === 0 ? 402 : 600}
                  height={402}
                  className={styles.userPostsItemImage}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ページネーションUI */}
      <div className={styles.pagination}>
        <button className={styles.paginationButton} onClick={() => handlePageChange(0)}>
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i ? styles.paginationSelectedButton : styles.paginationButton
            }
          >
            {i + 1}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          <MdOutlineLastPage className={styles.paginationButtonIcon} />
        </button>
      </div>
    </div>
  );
};
