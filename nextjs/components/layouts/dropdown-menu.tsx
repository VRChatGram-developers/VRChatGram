"use client";

import { useRef, useEffect } from "react";
import styles from "../styles/dropdown-menu.module.scss";
import { logOutWithFirebaseAuth } from "@/libs/firebase/firebase-auth";
import { UserForHeader } from "@/features/users/types";
import Image from "next/image";
import Link from "next/link";

type DropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: UserForHeader | null;
};

export const DropdownMenu = ({ isOpen, setIsOpen, user }: DropdownMenuProps) => {
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

  const BackgeoundImageURL =
    "https://i0.wp.com/bussan-b.info/wp-content/uploads/2021/03/%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88.jpg?resize=1024%2C576&ssl=1";

  return (
    <div className={styles.offcanvas} ref={menuRef}>
      <div className={styles.offcanvas__content}>
        <div
          className={styles.offcanvas__heading}
          style={{ backgroundImage: `url(${encodeURI(user?.profile_url || BackgeoundImageURL)})` }}
        >
          <div className={styles.offcanvas__heading__image_container}>
            <Image
              src={user?.profile_url || "/default-icon-user.png"}
              alt="user-icon"
              width={70}
              height={70}
              className={styles.offcanvas__heading__image_container__image}
            />
          </div>
        </div>
      </div>
      <div className={styles.offcanvas__toggle}>
        <div
          className={`${styles.offcanvas__menu} ${isOpen ? styles["offcanvas__menu--open"] : ""}`}
        >
          <div className={styles.offcanvas__menu__name_container}>
            <div className={styles.offcanvas__menu__name_container__name}>{user?.name}</div>
            <div className={styles.offcanvas__menu__name_container__my_id}>{user?.my_id}</div>
          </div>
          <div className={styles.offcanvas__menu__my_menu_container}>
            <div className={styles.offcanvas__item}>
              <Link href={`/users/${user?.my_id}`}>ダッシュボード</Link>
            </div>
            <div className={styles.offcanvas__item}>
              <Link href={`/users/likes`}>良いね一覧</Link>
            </div>
            <div className={styles.offcanvas__item}>
              <Link href={`/users/views`}>閲覧履歴</Link>
            </div>
          </div>
          <div className={styles.offcanvas__menu__setting_container}>
            <div className={styles.offcanvas__item}>
              <Link href={`/users/account-settings`}>アカウント設定</Link>
            </div>
          </div>
          <div className={styles.offcanvas__logout_container}>
            <div onClick={() => logOutWithFirebaseAuth()}>ログアウト</div>
          </div>
        </div>
      </div>
    </div>
  );
};
