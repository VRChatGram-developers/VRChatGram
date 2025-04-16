"use client";

import styles from "../styles/users.module.scss";
import Image from "next/image";
import { SocialLink, User } from "@/features/users/types/index";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { followUser, unfollowUser } from "@/features/users/endpoint";
import { UserPostList } from "./user-post-list";
import { UserHome } from "./user-home";
import { useSession } from "next-auth/react";
import { updateUserProfile } from "@/features/users/endpoint";
import { useEffect } from "react";
import { useSingleImageUpload } from "@/features/users/hooks/use-upload-image";
import { useRouter } from "next/navigation";
export const Users = ({ user }: { user: User }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [introductionTitle, setIntroductionTitle] = useState(user.introduction_title);
  const [introductionDetail, setIntroductionDetail] = useState(user.introduction_detail);
  const [socialLinks, setSocialLinks] = useState(user.social_links);
  const [name, setName] = useState(user.name);
  const {
    image: profileImage,
    handleImageChange: handleProfileImageChange,
  } = useSingleImageUpload("");
  const {
    image: backgroundImage,
    handleImageChange: handleBackgroundImageChange,
  } = useSingleImageUpload("");
  const [previewHeaderUrl, setPreviewHeaderUrl] = useState<string>("");
  const [previewProfileUrl, setPreviewProfileUrl] = useState<string>("");

  const handleUserEditing = () => {
    setIsUserEditing(!isUserEditing);
  };

  const { data: session } = useSession();
  const handleFollow = async () => {
    await followUser(user.my_id);
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    await unfollowUser(user.my_id);
    setIsFollowing(false);
  };

  useEffect(() => {
    const createdSocialLinkList = createSocialLinkList(user.social_links);
    setSocialLinks(createdSocialLinkList);
    setIsFollowing(user.isFollowedByAccount);
    setPreviewHeaderUrl(backgroundImage?.preview_url || "");
    setPreviewProfileUrl(profileImage?.preview_url || "");
  }, [user.social_links, user.isFollowedByAccount, profileImage, backgroundImage]);

  const handleEditSocialLink = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const socialLinkList = socialLinks.map((socialLink, i) => {
      if (i === index) {
        return { ...socialLink, platform_url: e.target.value };
      }
      return socialLink;
    });
    setSocialLinks(socialLinkList);
  };

  const createSocialLinkList = (socialLinks: SocialLink[]) => {
    const requiredLength = 5;
    const existingPlatforms = new Set(socialLinks.map((link) => link.platform_types));

    const emptyLinks: SocialLink[] = [];

    for (const platform of ["x", "discord"]) {
      if (
        !existingPlatforms.has(platform) &&
        emptyLinks.length + socialLinks.length < requiredLength
      ) {
        emptyLinks.push({ id: "", platform_types: platform, platform_url: "" });
      }
    }

    // 必要な数まで空要素を追加
    while (emptyLinks.length + socialLinks.length < requiredLength) {
      emptyLinks.push({ id: "", platform_types: "", platform_url: "" });
    }

    return [...socialLinks, ...emptyLinks];
  };

  const handleSubmitIntroduction = async () => {
    setIsUserEditing(true);

    const filteredSocialLinks = socialLinks.filter((socialLink) => socialLink.platform_url !== "");

    try {
      await updateUserProfile({
        myId: user.my_id,
        introduction_title: introductionTitle,
        introduction_detail: introductionDetail,
        profile_image: profileImage || undefined,
        header_image: backgroundImage || undefined,
        social_links: filteredSocialLinks,
        name: name,
      });
      setIsUserEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const BackgeoundImageURL =
    "https://i0.wp.com/bussan-b.info/wp-content/uploads/2021/03/%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88.jpg?resize=1024%2C576&ssl=1";

  const IconImageURL = "https://pbs.twimg.com/media/GijziWvbYAAfm3D?format=jpg&name=4096x4096";

  return (
    <>
      <div
        className={styles.profileHeaderContainer}
        style={
          isUserEditing
            ? {
                backgroundImage: `url(${
                  previewHeaderUrl || user.header_url || BackgeoundImageURL
                })`,
              }
            : { backgroundImage: `url(${encodeURI(user.header_url || previewHeaderUrl)})` }
        }
      >
        {/* ヘッダー画像の編集 */}
        {isUserEditing && (
          <div className={styles.headerIconEditContainer}>
            <input
              type="file"
              onChange={handleBackgroundImageChange}
              className={styles.headerUserIconInput}
            />
          </div>
        )}

        <div className={styles.profileHeaderContent}>
          <div className={styles.profileHeaderUserIconContainer}>
            {isUserEditing ? (
              <>
                <div className={styles.profileHeaderUserIconInputContainer}>
                  <div className={styles.profileHeaderUserIconInput}>
                    <input type="file" onChange={handleProfileImageChange} />
                  </div>
                  <Image
                    src={previewProfileUrl || user.profile_url || BackgeoundImageURL}
                    alt="profile"
                    width={260}
                    height={260}
                    className={styles.profileHeaderUserIcon}
                  />
                </div>
              </>
            ) : (
              <Image
                src={user.profile_url || IconImageURL}
                alt="profile"
                width={260}
                height={260}
                className={styles.profileHeaderUserIcon}
              />
            )}
          </div>
          <div className={styles.profuleHeaderInfomationContainer}>
            <div className={styles.profileUserNameContainer}>
              {isUserEditing ? (
                <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <p className={styles.profileUserNameText}>{user.name}</p>
              )}
            </div>
            <div className={styles.profuleUserStatusContainer}>
              <div className={styles.profileViewCount}>
                <p>{user.totalViews}閲覧</p>
              </div>
              <div className={styles.profilePostCount}>
                <p>投稿{user.posts[0].length}件</p>
              </div>
              <div className={styles.profileLikeCount}>
                <p>{user.totalLikes} いいね</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabNavigationConatiner}>
        <div className={styles.tabNavigationContent}>
          <div
            className={`${styles.tabNavigationItem} ${activeTab === 0 ? styles.active : ""}`}
            onClick={() => setActiveTab(0)}
          >
            <p className={styles.tabNavigationItemText}>ホーム</p>
          </div>
          <div
            className={`${styles.tabNavigationItem} ${activeTab === 1 ? styles.active : ""}`}
            onClick={() => setActiveTab(1)}
          >
            <p className={styles.tabNavigationItemText}>投稿一覧</p>
          </div>
        </div>

        <div className={styles.tabNavigationButtonContainer}>
          {session?.user &&
            renderFollowOrprofileEditButton(
              user,
              isFollowing,
              isUserEditing,
              handleUnfollow,
              handleFollow,
              handleUserEditing,
              handleSubmitIntroduction
            )}
        </div>
      </div>
      {activeTab === 0 && (
        <UserHome
          user={user}
          isUserEditing={isUserEditing}
          setIntroductionTitle={setIntroductionTitle}
          setIntroductionDetail={setIntroductionDetail}
          introductionTitle={introductionTitle}
          introductionDetail={introductionDetail}
          socialLinks={socialLinks}
          handleEditSocialLink={handleEditSocialLink}
        />
      )}
      {activeTab === 1 && <UserPostList user={user} />}
    </>
  );
};

const renderFollowOrprofileEditButton = (
  user: User,
  isFollowing: boolean,
  isUserEditing: boolean,
  handleUnfollow: () => void,
  handleFollow: () => void,
  handleUserEditing: () => void,
  handleSubmitIntroduction: () => void
) => {
  if (user.isCurrentUser) {
    if (isUserEditing) {
      return (
        <>
          <div className={styles.editProfileStoreButtonContainer}>
            <button className={styles.editProfileButton} onClick={handleSubmitIntroduction}>
              設定を保存
            </button>
          </div>
          <div className={styles.threeDots}>
            <BsThreeDots size={24} />
          </div>
        </>
      );
    }
    return (
      <>
        <div className={styles.editProfileButtonContainer}>
          <button className={styles.editProfileButton} onClick={handleUserEditing}>
            プロフィールを変更
          </button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots size={24} />
        </div>
      </>
    );
  }

  if (isFollowing) {
    return (
      <>
        <div className={styles.unFollowButtonContainer}>
          <button className={styles.unFollowButton} onClick={handleUnfollow}>
            フォローを外す
          </button>
        </div>
        <div className={styles.threeDots}>
          <BsThreeDots size={24} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.followButtonContainer}>
        <button className={styles.followButton} onClick={handleFollow}>
          フォロー
        </button>
      </div>
      <div className={styles.threeDots}>
        <BsThreeDots size={24} />
      </div>
    </>
  );
};
