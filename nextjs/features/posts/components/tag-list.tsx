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
  handleSelectTag: (tag: string) => void
}) => {
  const normalizeTag = (tag: string) => tag.replace(/^#/, "").trim();
  return (
    <div className={styles.tagList}>
      {popularTags.map(({ tag }) => {
         const normalizedTagName = normalizeTag(tag.name);
         const isSelected = normalizeTag(selectedTag) === normalizedTagName;
 
        return (
          <div className={styles.tagItemContainer} key={tag.id}>
          <button
            key={tag.id}
            className={`${isSelected ? styles.selectedTagItem : ``} ${styles.tagItem}`}
            onClick={() => handleSelectTag(tag.name)}
          >
            {tag.name === "ALL" ? "ALL" : `${tag.name}`}
          </button>
        </div>
        );
      })}
    </div>
  );
};
