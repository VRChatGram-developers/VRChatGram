"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "@/features/posts/styles/zoom-post-image.module.scss";

type ZoomPostImageProps = {
  imageUrl: string;
  alt?: string;
  onClose: () => void;
};

export const ZoomPostImage = ({ imageUrl, alt = "post image", onClose }: ZoomPostImageProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.imageWrapper} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="閉じる">
          ×
        </button>
        <img src={imageUrl} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};
