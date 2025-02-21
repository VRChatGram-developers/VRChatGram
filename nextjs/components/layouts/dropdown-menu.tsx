"use client";

import { useRef, useEffect } from "react";
import { logOutWithFirebaseAuth } from "@/libs/firebase/firebase-auth";

type DropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const DropdownMenu = ({ isOpen, setIsOpen }: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
      className="absolute right-[0px] mt-10 w-30 bg-white border rounded shadow-lg"
    >
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => logOutWithFirebaseAuth()}>ログアウト</div>
    </div>
  );
};
