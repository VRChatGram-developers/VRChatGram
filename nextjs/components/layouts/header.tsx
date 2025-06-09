"use client";

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "../styles/header.module.scss";
import { useState, useRef } from "react";
import { useModal } from "@/provider/modal-provider";
import { PostForm } from "@/features/posts/components/form/post-form";
import { DropdownMenu } from "@/components/layouts/dropdown-menu";
import { useSearchStore } from "@/libs/store/search-store";
import { createQueryParams } from "@/utils/queryParams";
import { useEffect, useCallback } from "react";
import { fetchUserForHeader } from "@/features/users/endpoint";
import { UserForHeader } from "@/features/users/types";
import { logOutWithFirebaseAuth } from "@/libs/firebase/firebase-auth";
import Link from "next/link";
import { useCloseMenuOnRouteChange } from "@/hooks/use-close-menu-on-route-change";

export const Header = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState<UserForHeader | null>(null);
  const { status, data: session } = useSession();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuIconRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  useCloseMenuOnRouteChange(setOpenMenu);

  const menuFunction = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    },
    [dropdownMenuRef, setIsDropdownOpen]
  );

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen, setIsDropdownOpen, handleClickOutside]);

  const handleSearch = async () => {
    const isTagSearch = searchQuery.includes("#");
    const keyword = isTagSearch ? searchQuery.replace("#", "") : searchQuery;

    const query = createQueryParams({
      [isTagSearch ? "tag" : "title"]: keyword,
      page: 1,
    });

    setSearchQuery(searchQuery);
    await router.push(`/posts?${query}`);
    setOpenMenu(false);
  };

  const handleRedirectToLogin = () => {
    router.push("/login");
    setOpenMenu(false);
  };

  const handleRedirectToSignup = () => {
    router.push("/signup");
    setOpenMenu(false);
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <Link
          href="/"
          className={styles.headerImageContainer}
          onClick={() => setOpenMenu(false)}
          prefetch={true}
        >
          <Image
            src="/header/vrcss_icon.svg"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            className={styles.logo}
          />
        </Link>

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
              <button onClick={handleRedirectToLogin} className={styles.signInButton}>
                <p className={styles.signInButtonText}>ログイン</p>
              </button>
              <button onClick={handleRedirectToSignup} className={styles.signUpButton}>
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
                  src={user?.profile_url || "/user-icon.png"}
                  alt="User Icon"
                  width={60}
                  height={60}
                  className={styles.userProfileIcon}
                  unoptimized
                  priority
                />
                <div ref={dropdownMenuIconRef}>
                  <RiArrowDownSLine
                    onClick={(e) => {
                      e.stopPropagation();

                      setIsDropdownOpen((prev) => !prev);
                    }}
                    className={styles.dropdownMenuIcon}
                    size={24}
                  />
                </div>
                {/* {isDropdownOpen && ( */}
                <div ref={dropdownMenuRef}>
                  <DropdownMenu isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} user={user} />
                </div>
                {/* )} */}
              </div>
            </>
          )}
        </div>

        {/* Mobile Only */}
        <div className={styles.headerMobileContainer} onClick={(e) => menuFunction(e)}>
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
        ref={menuRef}
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
                <Link
                  href="/login"
                  onClick={() => setOpenMenu(false)}
                  className={styles.signInButton}
                >
                  <p className={styles.signInButtonText}>ログイン</p>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpenMenu(false)}
                  className={styles.signUpButton}
                >
                  <p className={styles.signUpButtonText}>新規登録</p>
                </Link>
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
                      src={user?.profile_url || "/user-icon.png"}
                      alt="User Icon"
                      width={100}
                      height={100}
                      className={styles.userProfileIcon}
                      unoptimized
                    />
                    <p className={styles.userNameText}>{user?.name}</p>
                    <p className={styles.userIdText}>{user?.my_id}</p>
                  </div>
                  <div className={styles.moduleDrawerMenuContent}>
                    <div className={styles.moduleDrawerMenuSection}>
                      <div className={styles.moduleDrawerMenuLinkContainer}>
                        <Link
                          href={`/users/${user?.my_id}`}
                          className={styles.moduleDrawerMenutext}
                          prefetch={true}
                        >
                          ダッシュボード
                        </Link>
                      </div>
                      <div className={styles.moduleDrawerMenuLinkContainer}>
                        <Link
                          href="/users/likes"
                          className={styles.moduleDrawerMenutext}
                          prefetch={true}
                        >
                          良いね一覧
                        </Link>
                      </div>
                      <div className={styles.moduleDrawerMenuLinkContainer}>
                        <Link
                          href="/users/views"
                          className={styles.moduleDrawerMenutext}
                          prefetch={true}
                        >
                          閲覧履歴
                        </Link>
                      </div>
                    </div>
                    <div className={styles.moduleDrawerMenuSection}>
                      <div className={styles.moduleDrawerMenuLinkAccountSettingsContainer}>
                        <Link
                          href="/users/account-settings"
                          className={styles.moduleDrawerMenutext}
                          prefetch={true}
                        >
                          アカウント設定
                        </Link>
                      </div>
                    </div>
                    <div
                      className={styles.moduleDrawerMenuSection}
                      onClick={logOutWithFirebaseAuth}
                    >
                      <div className={`${styles.moduleDrawerMenuLinkLogoutContainer}`}>
                        <button className={`${styles.moduleDrawerMenutext}`}>ログアウト</button>
                      </div>
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
