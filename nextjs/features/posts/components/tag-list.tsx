"use client";

import styles from "../styles/tag-list.module.scss";
import { Tag } from "@/features/posts/types/index";

export const TagList = ({
  popularTags,
  selectedTag,
  setSelectedTag,
}: {
  popularTags: Tag[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}) => {
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className={styles.tagList}>
      {popularTags.map((tag) => (
        <button
          key={tag.id}
          className={
            selectedTag === tag.name
              ? `${styles.tagItem} ${styles.selectedTagItem}`
              : styles.tagItem
          }
          onClick={() => handleTagClick(tag.name)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};
