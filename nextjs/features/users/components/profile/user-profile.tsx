"use client";

import styles from "@/features/users/styles/user-profile.module.scss";
import Image from "next/image";
import { SocialLink, User } from "@/features/users/types/index";
import { useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { followUser, unfollowUser } from "@/features/users/endpoint";
import { UserPostList } from "./user-post-list";
import { UserHome } from "./user-home";
import { useSession } from "next-auth/react";
import { updateUserProfile, fetchS3SignedUrl } from "@/features/users/endpoint";
import { useEffect } from "react";
import { useSingleImageUpload } from "@/features/users/hooks/use-upload-image";
import { useRouter } from "next/navigation";
import { SignInFormModal } from "@/features/auth/components/sign-in-form-modal";
import { useModal } from "@/provider/modal-provider";
import { DropdownMenu } from "./drop-down-menu";
import { FaImage } from "react-icons/fa6";
import { Slide, toast } from "react-toastify";

export const UserProfile = ({ user }: { user: User }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [introductionTitle, setIntroductionTitle] = useState(user.introduction_title);
  const [introductionDetail, setIntroductionDetail] = useState(user.introduction_detail);
  const [socialLinks, setSocialLinks] = useState(user.social_links);
  const [name, setName] = useState(user.name);
  const { image: profileImage, handleImageChange: handleProfileImageChange } =
    useSingleImageUpload("");
  const { image: backgroundImage, handleImageChange: handleBackgroundImageChange } =
    useSingleImageUpload("");
  const [previewHeaderUrl, setPreviewHeaderUrl] = useState<string>("");
  const [previewProfileUrl, setPreviewProfileUrl] = useState<string>("");
  const { openModal, closeModal } = useModal();
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backgroundFileInputRef = useRef<HTMLInputElement>(null);
  const [isUserBlocked, setIsUserBlocked] = useState(user.isBlocked);

  const handleDropdownMenuOpen = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  };

  const handleUserEditing = () => {
    setIsUserEditing(!isUserEditing);
  };

  const { data: session } = useSession();
  const handleFollow = async () => {
    if (!session?.user) {
      openModal(<SignInFormModal onClose={closeModal} />);
      return;
    }
    setIsFollowing(true);
    await followUser(user.my_id);
  };

  const handleUnfollow = async () => {
    if (!session?.user) {
      openModal(<SignInFormModal onClose={closeModal} />);
      return;
    }
    setIsFollowing(false);
    await unfollowUser(user.my_id);
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
    const REQUIRED_LENGTH = 5;
    const PREFERRED_PLATFORMS = ["x", "discord"];
    const result: SocialLink[] = [...socialLinks];

    // 優先プラットフォームを優先的に追加（未登録かつ必要数未満なら）
    for (const platform of PREFERRED_PLATFORMS) {
      const alreadyExists = result.some((link) => link.platform_types === platform);
      if (!alreadyExists && result.length < REQUIRED_LENGTH) {
        result.push({ id: "", platform_types: platform, platform_url: "" });
      }
    }

    // 必要数まで空要素で埋める
    while (result.length < REQUIRED_LENGTH) {
      result.push({ id: "", platform_types: "other", platform_url: "" });
    }

    // 念のため最大5件で制限
    return result.slice(0, REQUIRED_LENGTH);
  };

  const handleSubmitIntroduction = async () => {
    setIsUserEditing(true);

    let updatedProfileImage: { url: string } | null = null;
    let updatedBackgroundImage: { url: string } | null = null;

    if (profileImage || backgroundImage) {
      const postImages = await Promise.all(
        [profileImage, backgroundImage].map(async (image) => {
          if (!image?.file) return null;
          const imageUrl = await uploadImage(image.file, image.file_name);
          return { url: imageUrl };
        })
      );

      [updatedProfileImage, updatedBackgroundImage] = postImages;
    }
    const filteredSocialLinks = socialLinks.filter((socialLink) => socialLink.platform_url !== "");
    try {
      await updateUserProfile({
        myId: user.my_id,
        introduction_title: introductionTitle,
        introduction_detail: introductionDetail,
        profile_image: updatedProfileImage || undefined,
        header_image: updatedBackgroundImage || undefined,
        social_links: filteredSocialLinks,
        name: name,
      });
      setIsUserEditing(false);

      toast.success("プロフィールを変更しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("プロフィールを変更に失敗しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    }
  };

  async function uploadImage(file: File, fileName: string): Promise<string> {
    // 1. APIから署名付きURL取得
    const response = await fetchS3SignedUrl({
      fileName: fileName,
      contentType: file.type,
    });

    const url = typeof response === "string" ? response : response.url;
    const uploadRes = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error("S3 upload failed");
    }

    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
    return `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/webp/${fileNameWithoutExtension}.webp`;
  }

  const BackgeoundImageURL =
    "https://i0.wp.com/bussan-b.info/wp-content/uploads/2021/03/%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88.jpg?resize=1024%2C576&ssl=1";

  const IconImageURL = "/user-icon.png";

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
        {isUserEditing && (
          <div className={styles.headerIconEditContainer}>
            <FaImage size={40} />
            <div className={styles.profileInputTextContainer}>
              <p className={styles.profileInputText}>ここにドロップ&ドロップ</p>
              <p className={styles.profileInputText}>または</p>
            </div>
            <input
              type="file"
              onChange={handleBackgroundImageChange}
              className={styles.headerUserIconInput}
              ref={backgroundFileInputRef}
              hidden
            />
            <div className={styles.headerUserIconInputButtonContainer}>
              <img
                src={"/upload-file.png"}
                alt="profile"
                className={styles.headerUserIconInputButtonImage}
              />
              <button
                className={styles.profileInputButton}
                onClick={() => backgroundFileInputRef.current?.click()}
              >
                ファイルを選択
              </button>
            </div>
          </div>
        )}

        <div className={styles.profileHeaderContent}>
          <div className={styles.profileHeaderUserIconContainer}>
            {isUserEditing ? (
              <div className={styles.profileHeaderUserIconInputContainer}>
                <div className={styles.profileHeaderUserIconInput}>
                  <FaImage size={32} />
                  <div className={styles.profileInputTextContainer}>
                    <p className={styles.profileInputText}>ここにドロップ&ドロップ</p>
                    <p className={styles.profileInputText}>または</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleProfileImageChange}
                    className={styles.headerUserIconInput}
                    ref={fileInputRef}
                    hidden
                  />

                  <div className={styles.profileHeaderUserIconInputButtonContainer}>
                    <img
                      src={"/upload-file.png"}
                      alt="profile"
                      className={styles.profileHeaderUserIconInputButtonImage}
                    />
                    <button
                      className={styles.profileInputButton}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      ファイルを選択
                    </button>
                  </div>
                </div>
                <div className={styles.profileUserIconContainer}>
                  <Image
                    src={previewProfileUrl || user.profile_url || IconImageURL}
                    alt="profile"
                    width={260}
                    height={260}
                    className={styles.profileHeaderUserIcon}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.profileUserIconContainer}>
                <Image
                  src={user.profile_url || IconImageURL}
                  alt="profile"
                  width={260}
                  height={260}
                  className={styles.profileHeaderUserIcon}
                />
              </div>
            )}
          </div>
          <div className={styles.profuleHeaderInfomationContainer}>
            {isUserEditing ? (
              <div className={styles.profileUserNameContainer}>
                <div className={styles.profileUserNameInputContainer}>
                  <input
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.profileUserNameInput}
                    placeholder="名前を入力"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className={styles.profileUserNameContainer}>
                  <p className={styles.profileUserNameText}>{user.name}</p>
                </div>
                <div className={styles.profuleUserStatusContainer}>
                  <div className={styles.profileViewCount}>
                    <p>{user.totalViews}閲覧</p>
                  </div>
                  <div className={styles.profilePostCount}>
                    <p>投稿{user.posts[0]?.length ?? 0}件</p>
                  </div>
                  <div className={styles.profileLikeCount}>
                    <p>{user.totalLikes} いいね</p>
                  </div>
                </div>
              </>
            )}
            <div className={styles.mobileButtonContainer}>
              {renderMobileFollowOrprofileEditButton(
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
          {renderFollowOrprofileEditButton(
            user,
            isFollowing,
            isUserEditing,
            handleUnfollow,
            handleFollow,
            handleUserEditing,
            handleSubmitIntroduction
          )}
          <div className={styles.threeDots}>
            <BsThreeDots size={24} onClick={handleDropdownMenuOpen} />
            {isDropdownMenuOpen && (
              <DropdownMenu
                isOpen={isDropdownMenuOpen}
                setIsOpen={setIsDropdownMenuOpen}
                blockedUserId={user.my_id}
                isBlocked={isUserBlocked}
                setIsUserBlocked={setIsUserBlocked}
              />
            )}
          </div>
        </div>
      </div>
      {activeTab === 0 && (
        <UserHome
          user={user}
          socialLinks={socialLinks}
          isUserEditing={isUserEditing}
          setIntroductionTitle={setIntroductionTitle}
          setIntroductionDetail={setIntroductionDetail}
          introductionTitle={introductionTitle}
          introductionDetail={introductionDetail}
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
    return (
      <>
        {isUserEditing ? (
          <div className={styles.editProfileStoreButtonContainer}>
            <button className={styles.editProfileStoreButton} onClick={handleSubmitIntroduction}>
              {"設定を保存"}
            </button>
          </div>
        ) : (
          <div className={styles.editProfileButtonContainer}>
            <button
              className={styles.editProfileButton}
              onClick={isUserEditing ? handleSubmitIntroduction : handleUserEditing}
            >
              {"プロフィール変更"}
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={isFollowing ? styles.unFollowButtonContainer : styles.followButtonContainer}>
        <button
          className={isFollowing ? styles.unFollowButton : styles.followButton}
          onClick={isFollowing ? handleUnfollow : handleFollow}
        >
          {isFollowing ? "フォローを外す" : "フォロー"}
        </button>
      </div>
    </>
  );
};

const renderMobileFollowOrprofileEditButton = (
  user: User,
  isFollowing: boolean,
  isUserEditing: boolean,
  handleUnfollow: () => void,
  handleFollow: () => void,
  handleUserEditing: () => void,
  handleSubmitIntroduction: () => void
) => {
  if (user.isCurrentUser) {
    return (
      <>
        {isUserEditing ? (
          <div className={styles.mobileEditProfileStoreButtonContainer}>
            <button
              className={styles.mobileEditProfileStoreButton}
              onClick={handleSubmitIntroduction}
            >
              {"設定を保存"}
            </button>
          </div>
        ) : (
          <div className={styles.mobileEditProfileButtonContainer}>
            <button
              className={styles.mobileEditProfileButton}
              onClick={isUserEditing ? handleSubmitIntroduction : handleUserEditing}
            >
              {"プロフィール変更"}
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={
          isFollowing ? styles.mobileUnFollowButtonContainer : styles.mobileFollowButtonContainer
        }
      >
        <button
          className={isFollowing ? styles.mobileUnFollowButton : styles.mobileFollowButton}
          onClick={isFollowing ? handleUnfollow : handleFollow}
        >
          {isFollowing ? "フォローを外す" : "フォロー"}
        </button>
      </div>
    </>
  );
};
