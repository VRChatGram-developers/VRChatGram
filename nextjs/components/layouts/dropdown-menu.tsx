"use client";

import { useRef, useEffect } from "react";
import styles from "../styles/dropdown-menu.module.scss";
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
    <div className={styles.offcanvas}>
      <div className={styles.offcanvas__content}>
        <h1 className={styles.offcanvas__heading}>contents</h1>
      </div>
      <div className={styles.offcanvas__toggle}>
        <div className={`offcanvas__menu ${isOpen ? "offcanvas__menu--open" : ""}`}>
          <ul className={styles.offcanvas__list}>
            <li className={styles.offcanvas__item}><a href="#">menu1</a></li>
            <li className={styles.offcanvas__item}><a href="#">menu2</a></li>
            <li className={styles.offcanvas__item}><a href="#">menu3</a></li>
            <li className={styles.offcanvas__item}><a href="#">menu4</a></li>
            <li className={styles.offcanvas__item}><a href="#">menu5</a></li>
            <p onClick={() => logOutWithFirebaseAuth()}>ログアウト</p>
          </ul>
        </div>
      </div>
    </div>
  );
};
