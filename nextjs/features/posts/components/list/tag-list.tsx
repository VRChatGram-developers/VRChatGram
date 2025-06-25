"use client";

import styles from "@/features/posts/styles/tag-list.module.scss";
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
  const normalizedSelectedTag = normalizeTag(selectedTag);

  const allTag = popularTags.find(({ tag }) => normalizeTag(tag.name) === "ALL");
  const tagsWithoutAll = popularTags.filter(({ tag }) => normalizeTag(tag.name) !== "ALL");
  const isSelectedAll = normalizedSelectedTag === "ALL";
  const selectedTagObj = !isSelectedAll
    ? tagsWithoutAll.find(({ tag }) => normalizeTag(tag.name) === normalizedSelectedTag) ?? {
        tag: { id: "selected", name: selectedTag },
      }
    : null;
  const otherTags = isSelectedAll
    ? tagsWithoutAll
    : tagsWithoutAll.filter(({ tag }) => normalizeTag(tag.name) !== normalizedSelectedTag);

  const sortedTags = [
    ...(allTag ? [allTag] : []),
    ...(selectedTagObj ? [selectedTagObj] : []),
    ...otherTags,
  ];

  return (
    <div className={styles.tagList}>
      {sortedTags.map(({ tag }) => {
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
