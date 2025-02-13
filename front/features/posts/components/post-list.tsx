"use client";

import styles from "../styles/post-list.module.scss";
import { SearchResult } from "./search-result";
import { Tag, Post } from "@/features/posts/types/index";
import { TagList } from "./tag-list";
import { useState, useMemo } from "react";

export const PostList = ({ posts, popularTags }: { posts: Post[][]; popularTags: Tag[] }) => {
  const [selectedTag, setSelectedTag] = useState("");

  const addAllToPopularTags = useMemo(
    () => [{ id: 0, name: "ALL" }, ...popularTags],
    [popularTags]
  );

  return (
    <>
      <div className={styles.postContainer}>
        <TagList
          popularTags={addAllToPopularTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <SearchResult posts={posts} selectedTag={selectedTag} />
      </div>
    </>
  );
};
