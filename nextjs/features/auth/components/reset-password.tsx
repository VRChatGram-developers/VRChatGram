"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/features/auth/styles/reset-password.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/libs/firebase/client";
import {
  TopThreePostImages as TopThreePostImagesTypes,
  TopThreePostImage as TopThreePostImageType,
} from "@/features/auth/type";

export const ResetPassword = ({
  topThreePostImages,
}: {
  topThreePostImages: TopThreePostImagesTypes;
}) => {
  const [isSendPasswordResetEmail, setIsSendPasswordResetEmail] = useState<boolean>(false);
  const [selectedDisplayPost, setSelectedDisplayPost] = useState<TopThreePostImageType | null>(
    null
  );

  useEffect(() => {
    if (topThreePostImages.topThreePostImages.length === 0) return;
    const randomIndex = Math.floor(Math.random() * topThreePostImages.topThreePostImages.length);
    setSelectedDisplayPost(topThreePostImages.topThreePostImages[randomIndex]);
  }, [topThreePostImages]);
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");

  const { status } = useSession();

  const isEmailValidated = () => {
    setErrorEmail("");

    if (email === "") {
      setErrorEmail("メールアドレスを入力してください");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[^@.]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail("正しいメールアドレスを入力してください");
      return false;
    }
    setErrorEmail("");
    return true;
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleResetPassword = async () => {
    const isEmailValidatedResult = isEmailValidated();

    if (!isEmailValidatedResult) {
      return;
    }
    try {
      setIsSendPasswordResetEmail(true);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.resetPasswordContainer}>
          <div className={styles.resetPasswordContent}>
            <div className={styles.resetPasswordTitleContent}>
              <p className={styles.resetPasswordTitle}>パスワード再発行</p>
            </div>
            <div className={styles.resetPasswordContentDetail}>
              {isSendPasswordResetEmail && (
                <div>
                  <p>
                    <span style={{ fontWeight: "bold" }}>{email}</span>
                    宛にメールを送信しました。メールに記載されているパスワード変更ページよりパスワードを変更してください。
                  </p>
                </div>
              )}

              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "1rem",
                  borderRadius: "5px",
                  fontSize: "0.8rem",
                  color: "#666",
                }}
              >
                <p>
                  メールが届かない場合は、迷惑メールフォルダに振り分けられる場合がありますので、すべてのメールをご確認してください
                </p>
              </div>
              <div className={styles.emailContainer}>
                <p className={styles.emailLabel}>メールアドレス</p>
                <div className={styles.emailForm}>
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    className={styles.emailFormInput}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errorEmail && <p className={styles.errorEmailMessage}>{errorEmail}</p>}
              </div>

              <div className={styles.resetPasswordButtonContent}>
                <button onClick={handleResetPassword} className={styles.userCreateButton}>
                  パスワードを変更
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.resetPasswordImageContainer}>
          <Image
            src={selectedDisplayPost?.images.url || "/default-login-image.jpg"}
            alt="Login page image"
            className="object-cover w-full h-full"
            width={864}
            height={800}
          />
          <div className={styles.resetPasswordPostInfoContainer}>
            <p className={styles.resetPasswordPostInfoContainerTitle}>
              {selectedDisplayPost?.title || ""}
            </p>
            <div className={styles.resetPasswordPostInfoUserContainer}>
              <Image
                src={selectedDisplayPost?.user?.profile_url || "user-icon.png"}
                alt="Profile image"
                width={32}
                height={32}
                unoptimized
                className={styles.resetPasswordPostInfoUserProfileImage}
              />
              <p>{selectedDisplayPost?.user?.name || ""}さんの投稿</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
