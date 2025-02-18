"use client";

import styles from "../styles/search-result.module.scss";
import { Post } from "@/features/posts/types/post";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdOutlineLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";
import { fetchPosts } from "@/features/posts/endpoint";
import { useRouter } from "next/navigation";

const breakpoints = {
  large: 1280, // 1280px以上
  medium: 1040, // 1040px以上1280px未満
  small: 768, // 768px以上1040px未満
};

const getColumns = (width: number) => {
  if (width >= breakpoints.large) {
    return 4; // 1280px以上は4カラム
  } else if (width >= breakpoints.medium) {
    return 3; // 1040px以上1280px未満は3カラム
  } else if (width >= breakpoints.small) {
    return 2; // 768px以上1040px未満は2カラム
  } else {
    return 1; // それ以下は1カラム
  }
};

const adjustGridLayout = (items: NodeListOf<Element>, columns: number) => {
  let rowIndex = 0;
  let rowItems: string[] = [];
  const itemsArr = Array.from(items);

  itemsArr.forEach((item, index) => {
    const isWide = item.classList.contains("wide");
    rowItems.push(isWide ? "wide" : "tall");

    // 現在の行にアイテムを追加
    if (rowItems.length === columns || index === itemsArr.length - 1) {
      // 行に配置できる数に達したら次の行へ
      rowItems.forEach((type, i) => {
        item.style.gridRowStart = rowIndex.toString();
        item.style.gridColumnStart = (i + 1).toString(); // 順番にカラムを設定
      });
      rowIndex += 1;
      rowItems = []; // 次の行のためにリセット
    }
  });
};

export const SearchResult = ({
  posts,
  selectedTag,
}: {
  posts: Post[][];
  selectedTag: string;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postList, setPostList] = useState<Post[][]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // 現在の画面幅を管理
  const router = useRouter();

  const totalPages = posts.length;
  const currentPosts = posts[currentPage] || [];

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    setPostList(await fetchPosts(page));
  };

  const handleToPostDetail = (id: string) => {
    router.push(`/posts/${id}`);
  };

  // 画面幅が変更されるたびに再計算
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffectでアイテム配置調整
  useEffect(() => {
    // コンポーネントがレンダリングされた後にDOMを操作
    const items = document.querySelectorAll(".userPostsItemImageContainer");

    const columns = getColumns(windowWidth); // 現在のカラム数を決定
    if (items.length > 0) {
      adjustGridLayout(items, columns); // アイテムの配置を調整
    }
  }, [windowWidth, posts]); // 画面幅やpostsが変わった時にレイアウトを再調整

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.mostPopularPost}>
        <Image
          src="/posts/sample-icon.png"
          alt="logo"
          width={260}
          height={260}
        />
        <p className={styles.mostPopularPostTitle}>{selectedTag}</p>
        <p className={styles.mostPopularPostCount}>投稿数: 100</p>
      </div>
      <div>
        <div className={styles.userPostsList}>
          {(currentPosts || postList).map((post) => {
            const imageWidth =
              Number(post.id) % 2 === 0
                ? 804
                : Number(post.id) % 3 === 0
                ? 402
                : 600;

            // 動的に "wide" または "tall" クラスを設定
            const imageClass = imageWidth > 600 ? styles.wide : styles.tall;

            return (
              <div
                key={post.id}
                className={`${styles.userPostsItemImageContainer} ${imageClass}`}
                onClick={() => handleToPostDetail(post.id.toString())}
              >
                <Image
                  src={
                    Number(post.id) % 2 === 0
                      ? "/users/post-sample-image.png"
                      : Number(post.id) % 3 === 0
                      ? "/users/post-sample-image3.png"
                      : "/users/post-sample-image2.png"
                  }
                  alt={`ピックアップ画像`}
                  width={imageWidth}
                  height={402}
                  className={styles.userPostsItemImage}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ページネーションUI */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(0)}
        >
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i
                ? styles.paginationSelectedButton
                : styles.paginationButton
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
