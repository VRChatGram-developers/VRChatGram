"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserEmail } from "../endpoint";
import { MdOutlineChangeCircle } from "react-icons/md";
import styles from "../styles/email-setting.module.scss";
import { Slide, toast } from "react-toastify";

type EmailSettingProps = {
  onClose: () => void;
  currentEmail: string;
};

export const EmailSetting = ({ onClose, currentEmail }: EmailSettingProps) => {
  const [email, setEmail] = useState(currentEmail);
  const [newEmail, setNewEmail] = useState("");
  const [errorNewEmail, setErrorNewEmail] = useState("");
  const router = useRouter();

  const isValidNewEmail = () => {
    setErrorNewEmail("");
    if (newEmail === "") {
      setErrorNewEmail("メールアドレスを入力してください");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[^@.]+\.[^@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrorNewEmail("正しいメールアドレスを入力してください");
      return false;
    }

    return true;
  };

  const handleUpdateEmail = async () => {
    const isValidNewEmailResult = isValidNewEmail();
    if (!isValidNewEmailResult) {
      return;
    }

    try {
      await updateUserEmail(email, newEmail);

      toast.success("メールアドレスを変更しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("メールアドレスの変更に失敗しました", {
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
    <div className={styles.emailSettingContainer}>
      <MdOutlineChangeCircle className={styles.emailSettingIcon} />
      <div className={styles.emailSettingTitle}>メールアドレスの変更</div>
      <div className={styles.emailSettingContentContainer}>
        <div className={styles.emailSettingInputContainer}>
          <div className={styles.emailSettingContentTitle}>現在のメールアドレス</div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailSettingContentInput}
              disabled
            />
          </div>
        </div>
        <div className={styles.emailSettingInputContainer}>
          <div className={styles.emailSettingContentTitle}>新しいメールアドレス</div>
          <div>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={styles.emailSettingContentInput}
              placeholder="example@example.com"
            />
            {errorNewEmail.length > 0 && (
              <div className={styles.emailSettingErrorMessage}>{errorNewEmail}</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.emailSettingBorder}></div>
      <div className={styles.emailSettingButtonContainer}>
        <button onClick={handleUpdateEmail} className={styles.emailSettingButton}>
          変更する
        </button>
      </div>
    </div>
  );
};
