"use client";

import styles from "../styles/search-result.module.scss";
import { Post } from "@/features/posts/types/index";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdOutlineLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";
import { fetchPosts } from "@/features/posts/endpoint";
import { useRouter } from "next/navigation";
import { createQueryParams } from "@/utils/queryParams";
import { useSearchStore } from "@/libs/store/search-store";

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
  postCount,
  currentPage,
  totalPages,
}: {
  posts: Post[];
  selectedTag: string;
  postCount: number;
  currentPage: number;
  totalPages: number;
}) => {
  const [changedCurrentPage, setChangedCurrentPage] = useState(currentPage - 1);

  const [postList, setPostList] = useState<Post[]>(posts);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // 現在の画面幅を管理
  const [selectedSortOption, setSelectedSortOption] = useState<string>("newest"); // 選択されたソートオプションを管理

  const router = useRouter();
  const { searchQuery } = useSearchStore();

  const searchSortOptions = [
    { label: "新着順", value: "newest" },
    { label: "人気順", value: "popular" },
    { label: "今週の人気順", value: "this_week_popular" },
  ];

  useEffect(() => {
    setPostList(posts);
  }, [posts, changedCurrentPage]);

  const handlePageChange = async (page: number) => {
    setChangedCurrentPage(page);
    const query = searchQuery.includes("#")
      ? createQueryParams({ tag: searchQuery, page: page + 1 })
      : createQueryParams({ title: searchQuery, page: page + 1 });

    const postsList = await fetchPosts(query);
    setPostList(postsList.posts);
  };

  const handleToPostDetail = (id: string) => {
    router.push(`/posts/${id}`);
  };

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChangedCurrentPage(0);
    const query = searchQuery.includes("#")
      ? createQueryParams({ tag: searchQuery, page: 1, sort: e.target.value })
      : createQueryParams({ title: searchQuery, page: 1, sort: e.target.value });

    setSelectedSortOption(e.target.value);

    const postsList = await fetchPosts(query);
    setPostList(postsList.posts);
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
    // Todo 画像を取得できるようになってから
    // コンポーネントがレンダリングされた後にDOMを操作
    const items = document.querySelectorAll(".userPostsItemImageContainer");

    const columns = getColumns(windowWidth); // 現在のカラム数を決定
    if (items.length > 0) {
      adjustGridLayout(items, columns); // アイテムの配置を調整
    }
  }, [windowWidth, posts]);

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.searchContainer}>
        <Image
          src="/posts/sample-icon.png"
          alt="logo"
          className={styles.searchThumbnail}
          width={260}
          height={260}
        />
        <div className={styles.searchDetailContainer}>
          <p className={styles.searchDetailTitle}>{selectedTag}</p>
          <div className={styles.searchDetailContent}>
            <p className={styles.searchPostCount}>投稿数: {postCount}</p>
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
      <div>
        <div className={styles.userPostsList}>
          {postList.map((post, index) => {
            const imageWidth =
              Number(post.id) % 2 === 0 ? 804 : Number(post.id) % 3 === 0 ? 402 : 600;

            // 動的に "wide" または "tall" クラスを設定
            const imageClass = imageWidth > 600 ? styles.wide : styles.tall;

            return (
              <div
                key={`${post.id}-${index}`}
                className={`${styles.userPostsItemImageContainer} ${imageClass}`}
                onClick={() => handleToPostDetail(post.id.toString())}
              >
                <Image
                  src={
                    Number(post.id) % 2 === 0
                      ? post.images[0].url
                      : Number(post.id) % 3 === 0
                      ? post.images[0].url
                      : post.images[0].url
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
        <button className={styles.paginationButton} onClick={() => handlePageChange(0)}>
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              changedCurrentPage === i ? styles.paginationSelectedButton : styles.paginationButton
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
