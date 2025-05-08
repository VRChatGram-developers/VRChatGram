"use client";

import { useRef, useEffect } from "react";
import styles from "@/features/users/styles/drop-down-menu.module.scss";
import { blockUser } from "@/features/users/endpoint";
type DropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  blockedUserId: string;
};

export const DropdownMenu = ({ isOpen, setIsOpen, blockedUserId }: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const googleFormLinks ="https://docs.google.com/forms/d/e/1FAIpQLSc2wPHJNSmD8tBIWMb6UDrJzlXNF3dYFx-okEQvITZvRXpOtQ/viewform";

  const handleReportUser = () => {
    window.open(googleFormLinks, "_blank");
  };

  const handleBlockUser = async () => {
    try {
      await blockUser(blockedUserId);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // メニュー外をクリックしたら閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  // 最初は非表示
  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={styles.menuContainer}
    >
      <div className={styles.menuItem} onClick={handleReportUser}>ユーザーを報告する</div>
      <div className={styles.menuItem} onClick={handleBlockUser}>ユーザーをブロックする</div>
    </div>
  );
};
