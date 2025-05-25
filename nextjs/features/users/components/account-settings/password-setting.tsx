"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserPassword } from "../../endpoint";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import styles from "@/features/users/styles/password-setting.module.scss";
import { Slide, toast } from "react-toastify";

type PasswordSettingProps = {
  onClose: () => void;
};

export const PasswordSetting = ({ onClose }: PasswordSettingProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const router = useRouter();

  const isValidCurrentPassword = () => {
    setErrorCurrentPassword("");
    if (!currentPassword) {
      setErrorCurrentPassword("パスワードを入力してください");
      return false;
    }

    if (currentPassword.length < 6) {
      setErrorNewPassword("パスワードは6文字以上で入力してください");
      return false;
    }
    return true;
  };

  const isValidNewPassword = () => {
    setErrorNewPassword("");
    if (!newPassword) {
      setErrorNewPassword("パスワードを入力してください");
      return false;
    }

    if (newPassword.length < 6) {
      setErrorNewPassword("パスワードは6文字以上で入力してください");
      return false;
    }

    // 半角英字、数字、記号をすべて含むかチェック
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword);

    if (!(hasLetter && hasNumber && hasSymbol)) {
      setErrorNewPassword("パスワードは半角英字、数字、記号を含めてください");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async () => {
    const isValidCurrentPasswordResult = isValidCurrentPassword();
    const isValidNewPasswordResult = isValidNewPassword();
    if (!isValidCurrentPasswordResult || !isValidNewPasswordResult) {
      return;
    }

    try {
      await updateUserPassword(currentPassword, newPassword);
      toast.success("パスワードを変更しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("パスワードの変更に失敗しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    }

    onClose();
    router.refresh();
  };

  return (
    <div className={styles.passwordSettingContainer}>
      <MdOutlineChangeCircle className={styles.passwordSettingIcon} />
      <div className={styles.passwordSettingTitle}>パスワードの変更</div>
      <div className={styles.passwordSettingContentContainer}>
        <div className={styles.passwordSettingInputContainer}>
          <div className={styles.passwordSettingContentTitle}>現在のパスワード</div>
          <div className={styles.passwordSettingFieldContainer}>
            <input
              type={isCurrentPasswordVisible ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.passwordSettingContentInput}
            />
            {isCurrentPasswordVisible ? (
              <FaRegEyeSlash
                className={styles.eyeIconSlash}
                onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
              />
            ) : (
              <FaRegEye
                className={styles.eyeIcon}
                onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
              />
            )}
            {errorCurrentPassword.length > 0 && (
              <div className={styles.passwordSettingErrorMessage}>{errorCurrentPassword}</div>
            )}
          </div>
        </div>
        <div className={styles.passwordSettingInputContainer}>
          <div className={styles.passwordSettingInputContainer}>
            <div className={styles.passwordSettingContentTitle}>変更後のパスワード</div>
            <div className={styles.passwordSettingFieldContainer}>
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.passwordSettingContentInput}
              />
              {isNewPasswordVisible ? (
                <FaRegEyeSlash
                  className={styles.eyeIconSlash}
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                />
              ) : (
                <FaRegEye
                  className={styles.eyeIcon}
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                />
              )}
              {errorNewPassword.length > 0 && (
                <div className={styles.passwordSettingErrorMessage}>{errorNewPassword}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.passwordSettingBorder} />
      <div className={styles.passwordSettingButtonContainer}>
        <button onClick={handleUpdatePassword} className={styles.passwordSettingButton}>
          変更する
        </button>
      </div>
    </div>
  );
};
