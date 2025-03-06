"use client";

import styles from "../styles/tag-list.module.scss";
import { Tag } from "@/features/posts/types/index";

export const TagList = ({
  popularTags,
  selectedTag,
  handleSelectTag,
}: {
  popularTags: Tag[];
  selectedTag: string;
  handleSelectTag: (tag: string) => void;
}) => {
  return (
    <div className={styles.tagList}>
      {popularTags.map(({ tag }) => (
        <button
          key={tag.id}
          className={
            selectedTag === `#${tag.name}`
              ? `${styles.tagItem} ${styles.selectedTagItem}`
              : styles.tagItem
          }
          onClick={() => handleSelectTag(tag.name)}
        >
          #{tag.name}
        </button>
      ))}
    </div>
  );
};
