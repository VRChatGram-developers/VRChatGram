"use client";

import styles from "../styles/user-post-list.module.scss";
import { User } from "@/features/users/types/user";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";

export const UserPostList = ({ user }: { user: User }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = user.posts.length; // 既にチャンク化されているので、配列の長さがページ数
  const currentPosts = user.posts[currentPage] || []; // 現在のチャンクを直接参照

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.userPostsTitle}>
        <p>投稿一覧</p>
      </div>
      <div>
        <ul className={styles.userPostsList}>
          {currentPosts.map((post) => (
            <li key={post.id} className={styles.userPostsItem}>
              <div className={styles.userPostsItemImageContainer}>
                {/* post.idが偶数の場合post-sample-image.png　を表示、奇数の場合post-sample-image2.pngを表示、それによってwidthを変更 さらに３の倍数の場合画像も別のものにして、widthを200にする*/}

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
        <button className={styles.paginationButton} onClick={() => setCurrentPage(0)}>
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={
              currentPage === i ? styles.paginationSelectedButton : styles.paginationButton
            }
          >
            {i + 1}
          </button>
        ))}
        <button className={styles.paginationButton} onClick={() => setCurrentPage(totalPages - 1)}>
          <MdOutlineLastPage className={styles.paginationButtonIcon} />
        </button>
      </div>
    </div>
  );
};
