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
import { DropdownMenu } from "@/components/layouts/dropdown-menu";
import { useSearchStore } from "@/libs/store/search-store";
import { createQueryParams } from "@/utils/queryParams";
import { useEffect } from "react";
import { fetchUserForHeader } from "@/features/users/endpoint";
import { UserForHeader } from "@/features/users/types";

export const Header = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState<UserForHeader | null>(null);
  const { status, data: session } = useSession();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserForHeader();
      if (typeof user === "string") {
        console.error(user);
      } else {
        setUser(user);
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session]);
  

  const handleRedirectToAccountSettings = () => {
    router.push("/users/account-settings");
  };

  const handleToMyViewsPosts = () => {
    router.push(`/users/views`);
  };

  const handleToMyFavoritePosts = () => {
    router.push(`/users/likes`);
  };

  const handleToTopPage = () => {
    setSearchQuery("");
    router.push(`/`);
  };

  const handleSearch = () => {
    const query = searchQuery.includes("#")
      ? createQueryParams({ tag: searchQuery, page: 1 })
      : createQueryParams({ title: searchQuery, page: 1 });
    setSearchQuery(searchQuery);

    router.push(`/posts?${query}`);
  };
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerImageContainer}>
          <Image
            src="/header/vrcss_icon.svg"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            className={styles.logo}
            onClick={handleToTopPage}
          />
        </div>

        {/* PC Only */}
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="何かお探しですか？"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch size={24} className={styles.FaSearch} onClick={handleSearch} />
        </div>

        <div className={styles.headerButtonsContainer}>
          {status == "loading" ? (
            <></>
          ) : status !== "authenticated" ? (
            <>
              <button onClick={() => router.push("/signin")} className={styles.signInButton}>
                <p className={styles.signInButtonText}>ログイン</p>
              </button>
              <button onClick={() => router.push("/signup")} className={styles.signUpButton}>
                <p className={styles.signUpButtonText}>新規登録</p>
              </button>
            </>
          ) : (
            <>
              <div className={styles.postButtonContainer}>
                <button onClick={() => openModal(<PostForm onClose={closeModal} />)}>
                  <p className={styles.postButtonText}>写真を投稿</p>
                  <FaCamera size={24} />
                </button>
              </div>
              <div className={styles.userIconContainer}>
                <Image
                  src={user?.profile_url || "/default-icon-user.png"}
                  alt="User Icon"
                  width={60}
                  height={60}
                  className={styles.userProfileIcon}
                />
                <RiArrowDownSLine onClick={() => setIsDropdownOpen(!isDropdownOpen)} size={24} />
                {isDropdownOpen && (
                  <DropdownMenu isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} user={user} />
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Only */}
        <div className={styles.headerMobileContainer} onClick={() => menuFunction()}>
          <div
            className={`${styles.headerMobileHumburger} ${
              openMenu ? styles.headerMobileHumburgerOpen : undefined
            }`}
          >
            <span className={openMenu ? styles.spanOpen : undefined}></span>
            <span className={openMenu ? styles.spanOpen : undefined}></span>
            <span className={openMenu ? styles.spanOpen : undefined}></span>
          </div>
        </div>
      </header>
      <div
        className={`${styles.headerMobileDrawerMenu} ${
          openMenu ? styles.headerMobileDrawerMenuOpen : undefined
        }`}
      >
        <div className={styles.headerMobileDraweContainer}>
          <div className={styles.searchInputMobileContainer}>
            <input
              type="text"
              placeholder="何かお探しですか？"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FaSearch size={24} className={styles.FaSearch} onClick={handleSearch} />
          </div>
          <div className={styles.headerMobileButtonsContainer}>
            {status == "loading" ? (
              <></>
            ) : status !== "authenticated" ? (
              <>
                <button onClick={() => router.push("/signin")} className={styles.signInButton}>
                  <p className={styles.signInButtonText}>ログイン</p>
                </button>
                <button onClick={() => router.push("/signup")} className={styles.signUpButton}>
                  <p className={styles.signUpButtonText}>新規登録</p>
                </button>
              </>
            ) : (
              <>
                <div className={styles.postButtonContainer}>
                  <button onClick={() => openModal(<PostForm onClose={closeModal} />)}>
                    <p className={styles.postButtonText}>写真を投稿</p>
                    <FaCamera size={24} />
                  </button>
                </div>

                {/* memo Webサイズの時に押した時は下記と同じのを出したい */}
                <div className={styles.userIconContainer}>
                  <div className={styles.userProfileContainer}>
                    <Image
                      src={user?.profile_url || "/default-icon-user.png"}
                      alt="User Icon"
                      width={100}
                      height={100}
                      className={styles.userProfileIcon}
                    />
                    <p className={styles.userNameText}>{user?.name}</p>
                    <p className={styles.userIdText}>@{user?.my_id}</p>
                  </div>
                  <div className={styles.moduleDrawerMenuContent}>
                    <div className={styles.moduleDrawerMenuSection}>
                      <p
                        className={`${styles.moduleDrawerMenutext}`}
                        onClick={() => router.push(`/users/${user?.my_id}`)}
                      >
                        ダッシュボード
                      </p>
                      <p
                        className={`${styles.moduleDrawerMenutext}`}
                        onClick={handleToMyFavoritePosts}
                      >
                        良いね一覧
                      </p>
                      <p
                        className={`${styles.moduleDrawerMenutext}`}
                        onClick={handleToMyViewsPosts}
                      >
                        閲覧履歴
                      </p>
                    </div>
                    <div className={styles.moduleDrawerMenuSection}>
                      <p>Language</p>
                      <p className={`${styles.moduleDrawerMenutext}`}>日本語</p>
                      <p
                        className={`${styles.moduleDrawerMenutext}`}
                        onClick={handleRedirectToAccountSettings}
                      >
                        アカウント設定
                      </p>
                    </div>
                    <div className={styles.moduleDrawerMenuSection}>
                      <button className={`${styles.moduleDrawerMenutext}`}>ログアウト</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
