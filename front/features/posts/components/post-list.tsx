"use client";

import styles from "./styles/posts.module.scss";
import { SearchResult } from "./search-result";
import { Post } from "@/features/posts/types/post";
import { Tag } from "@/features/posts/types/tag";
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
