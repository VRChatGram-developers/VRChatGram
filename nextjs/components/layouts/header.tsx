"use client";

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "../styles/header.module.scss";
import { useState } from "react";
import { useModal } from "@/provider/modal-provider";
import { PostForm } from "@/features/posts/components/post-form";

export const Header = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const { status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    router.push(`/posts?query=${searchQuery}`);
  };
  return (
    <header className={styles.header}>
      <Image
        src="/header/logo.png"
        alt="Logo"
        width={118}
        height={32}
        className={styles.logo}
        onClick={() => router.push("/")}
      />
      <div className={styles.searchInput}>
        <div>
          <input
            type="text"
            placeholder="何かお探しですか？"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch className={styles.FaSearch} onClick={handleSearch} />
        </div>
      </div>
      <div className={styles.headerButtonsContainer}>
        {status == "loading" ? (
          <></>
        ) : status !== "authenticated" ? (
          <>
            <button onClick={() => router.push("/sign-in")} className={styles.signInButton}>
              ログイン
            </button>
            <button onClick={() => router.push("/sign-up")} className={styles.signUpButton}>
              新規登録
            </button>
          </>
        ) : (
          <>
            <div className={styles.postButton}>
              <button onClick={() => openModal(<PostForm onClose={closeModal} />)}>
                写真を投稿
                <FaCamera />
              </button>
            </div>
            <div className={styles.userIcon}>
              <Image src="/header/user-sample-icon.png" alt="User Icon" width={40} height={40} />
              <RiArrowDownSLine />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
