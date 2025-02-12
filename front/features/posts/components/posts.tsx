"use client";

import styles from "./styles.module.scss";
import { PostList } from "./post-list/post-list";
import { Post } from "@/features/posts/types/post";
import { Tag } from "@/features/posts/types/tag";
import { TagList } from "./tag-list/tag-list";
import { useState, useMemo } from "react";

export const Posts = ({ posts, popularTags }: { posts: Post[][]; popularTags: Tag[] }) => {
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
        <PostList posts={posts} selectedTag={selectedTag} />
      </div>
    </>
  );
};
