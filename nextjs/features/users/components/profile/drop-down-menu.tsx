"use client";

import { useRef, useEffect } from "react";
import styles from "@/features/users/styles/drop-down-menu.module.scss";
import { blockUser, unblockUser } from "@/features/users/endpoint";

type DropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  blockedUserId: string;
  isBlocked: boolean;
  setIsUserBlocked: (blocked: boolean) => void;
};

export const DropdownMenu = ({
  isOpen,
  setIsOpen,
  blockedUserId,
  isBlocked,
  setIsUserBlocked,
}: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const googleFormLinks =
    "https://docs.google.com/forms/d/e/1FAIpQLSc2wPHJNSmD8tBIWMb6UDrJzlXNF3dYFx-okEQvITZvRXpOtQ/viewform";

  const handleReportUser = () => {
    window.open(googleFormLinks, "_blank");
  };

  const handleBlockorUnblockUser = async () => {
    const newBlockedState = !isBlocked;
    setIsUserBlocked(newBlockedState); // UI をすぐに反映
    setIsOpen(false); // メニューをすぐ閉じる

    try {
      if (newBlockedState) {
        await blockUser(blockedUserId);
      } else {
        await unblockUser(blockedUserId);
      }
    } catch (error) {
      setIsUserBlocked(!newBlockedState);
      console.error("API失敗", error);
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
    <div ref={menuRef} className={styles.menuContainer}>
      <div className={styles.menuItem} onClick={handleReportUser}>
        ユーザーを報告する
      </div>

      <div className={styles.menuItem} onClick={handleBlockorUnblockUser}>
        {isBlocked ? "ブロックを解除する" : "ユーザーをブロックする"}
      </div>
    </div>
  );
};
