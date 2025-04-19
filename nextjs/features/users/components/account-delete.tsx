"use client";

import { deleteAccount, checkPassword } from "../endpoint";
import { logOutWithFirebaseAuth } from "@/libs/firebase/firebase-auth";
import { useState } from "react";
import { GrCircleAlert } from "react-icons/gr";
import styles from "../styles/account-delete.module.scss";

export const AccountDelete = ({ onClose }: { onClose: () => void }) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidPassword = () => {
    setPasswordError("");
    if (!password) {
      setPasswordError("パスワードを入力してください");
      return false;
    }

    if (password.length < 6) {
      setPasswordError("パスワードは6文字以上で入力してください");
      return false;
    }

    // 半角英字、数字、記号をすべて含むかチェック
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (!(hasLetter && hasNumber && hasSymbol)) {
      setPasswordError("パスワードは半角英字、数字、記号を含めてください");
      return false;
    }
    return true;
  };

  const handleDeleteAccount = async () => {
    const isValidPasswordResult = isValidPassword();
    if (!isValidPasswordResult) {
      return;
    }

    try {
      const isValidPassword = await checkPassword(password);
      if (!isValidPassword) {
        setPasswordError("パスワードが正しくありません");
        return;
      }
    } catch (error) {
      console.error(error);
      setPasswordError("パスワードが正しくありません");
      return;
    }

    try {
      await deleteAccount();
      logOutWithFirebaseAuth();
    } catch {
      console.error("削除に失敗しました");
    }
    onClose();
  };

  return (
    <div className={styles.accountDeleteContainer}>
      <GrCircleAlert className={styles.accountDeleteAlertIcon} />
      <div className={styles.accountDeleteTitleContainer}>
        <div>アカウント削除</div>
      </div>
      <div className={styles.accountDeleteContentContainer}>
        <div className={styles.accountDeleteAlertDescriptionContainer}>
          <div>削除すると、以下の情報がすべて失われます。</div>
          <div className={styles.accountDeleteAlertDescriptionListContainer}>
            <div>・プロフィール情報</div>
            <div>・写真データ</div>
            <div>・お気に入り</div>
            <div>・フォロー/フォロワー</div>
          </div>
        </div>
        <div className={styles.accountDeletePasswordContainer}>
          <div>続けるには、VRCSSのパスワードを入力してください</div>
          <div>
            <input
              className={styles.accountDeletePasswordInput}
              type="password"
              placeholder="VRCSSのパスワード"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        </div>
        <div className={styles.accountDeleteBorder}></div>
      </div>
      <div className={styles.accountDeleteButtonContainer}>
        <button onClick={handleDeleteAccount} className={styles.accountDeleteButton}>
          アカウントを削除
        </button>
      </div>
    </div>
  );
};
