"use client";

import styles from "../styles/post-list.module.scss";
import { SearchResult } from "./search-result";
import { Tag, PostList as PostListType } from "@/features/posts/types/index";
import { TagList } from "./tag-list";
import { useState, useMemo, useEffect } from "react";
import { useSearchStore } from "@/libs/store/search-store";
import { useRouter } from "next/navigation";
import { createQueryParams } from "@/utils/queryParams";
import { ClipLoader } from "react-spinners";


export const PostList = ({ posts, popularTags }: { posts: PostListType; popularTags: Tag[] }) => {
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [displayPosts, setDisplayPosts] = useState<PostListType>(posts);
  const { setSearchQuery } = useSearchStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const handleSelectTag = async (tag: string) => {
    const tagName = tag === "ALL" ? tag : `${tag}`;
    setSelectedTag(tagName);
  
    if (tagName === "ALL") {
      setSearchQuery("");
      router.push(`/posts?${createQueryParams({ tag: "", page: 1 })}`);
    } else {
      setSearchQuery(tagName);
      router.push(`/posts?${createQueryParams({ tag: tagName, page: 1 })}`);
    }
  };

  useEffect(() => {
    setDisplayPosts(posts);
    setIsLoading(false);
  }, [posts]);

  const addAllToPopularTags = useMemo(
    () => [
      { tag: { id: 0, name: "ALL" } },
      ...popularTags,
    ],
    [popularTags]
  );

  return (
    <>
      <div className={styles.postContainer}>
        <TagList
          popularTags={addAllToPopularTags as Tag[]}
          selectedTag={selectedTag}
          handleSelectTag={handleSelectTag}
        />
         {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      ) : (
        <SearchResult
          posts={displayPosts.posts}
          selectedTag={selectedTag}
          postCount={displayPosts.postCount}
          currentPage={displayPosts.currentPage}
          totalPages={displayPosts.totalPages}
          postImageUrlWithMaxLikes={displayPosts.postImageUrlWithMaxLikes}
        />
      )}
      </div>
    </>
  );
};
