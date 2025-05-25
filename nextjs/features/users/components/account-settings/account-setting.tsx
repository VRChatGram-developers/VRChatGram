"use client";

import { useState } from "react";
import { updateUser } from "../../endpoint";
import { useRouter } from "next/navigation";
import { useModal } from "@/provider/modal-provider";
import { AccountDelete } from "./account-delete";
import { PasswordSetting } from "./password-setting";
import { AccountSetting as AccountSettingType } from "../../types/index";
import { EmailSetting } from "./email-setting";
import styles from "../../styles/account-setting.module.scss";
import { Slide, toast } from "react-toastify";
export const AccountSetting = ({ accountSetting }: { accountSetting: AccountSettingType }) => {
  const { openModal, closeModal } = useModal();
  const [showSensitiveType, setShowSensitiveType] = useState(accountSetting.show_sensitive_type);
  const [gender, setGender] = useState(accountSetting.gender);
  const router = useRouter();

  const genderList = [
    {
      value: "male",
      label: "男性",
    },
    {
      value: "female",
      label: "女性",
    },
    {
      value: "other",
      label: "どちらでもない",
    },
  ];

  const handleShowSensitiveType = () => {
    const newValue = showSensitiveType === "all" ? "safe" : "all";
    setShowSensitiveType(newValue);
  };

  const handleUpdate = async () => {
    try {
      await updateUser({
        show_sensitive_type: showSensitiveType,
        gender,
      });
      toast.success("アカウント設定を変更しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("アカウント設定の変更に失敗しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className={styles.accountSettingContainer}>
      <div className={styles.accountSettingTitle}>アカウント設定</div>
      <div className={styles.accountSettingContentContainerWrapper}>
        <div className={styles.accountSettingContentContainer}>
          <div className={styles.emailSettingConatiner}>
            <div className={styles.emailSettingLabel}>メールアドレス</div>
            <div
              className={styles.emailSettingChangeButton}
              onClick={() =>
                openModal(<EmailSetting onClose={closeModal} currentEmail={accountSetting.email} />)
              }
            >
              <div>変更する</div>
            </div>
          </div>
          <div className={styles.passwordSettingConatiner}>
            <div className={styles.passwordSettingLabel}>パスワード</div>
            <div
              className={styles.passwordSettingChangeButton}
              onClick={() => openModal(<PasswordSetting onClose={closeModal} />)}
            >
              <div>変更する</div>
            </div>
          </div>
          <div className={styles.genderSettingContainer}>
            <div className={styles.genderSettingLabel}>性別</div>
            <div className={styles.genderSettingRadioButtonContainer}>
              {genderList.map((genderItem) => (
                <div key={genderItem.value} className={styles.genderSettingRadioButtonItem}>
                  <input
                    type="radio"
                    value={genderItem.value}
                    checked={gender == genderItem.value}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className={styles.genderSettingRadioButtonLabel}>{genderItem.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sensitiveTypeSettingContainer}>
            <div className={styles.sensitiveTypeSettingLabel}>
              センシティブな内容の表示設定を変更する
            </div>
            <div className={styles.sensitiveTypeSettingRadioButtonContainer}>
              <div
                className={styles.sensitiveTypeSettingRadioButtonItem}
                onClick={handleShowSensitiveType}
                role="switch"
                aria-checked={showSensitiveType === "all"}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleShowSensitiveType();
                }}
              >
                <div className={styles.sensitiveTypeSettingRadioButtonItemInputSlider}>
                  <div
                    className={`${styles.sliderThumb} ${
                      showSensitiveType === "all" ? styles.sliderThumbChecked : ""
                    }`}
                  />
                </div>
                <div className={styles.sensitiveTypeSettingRadioButtonItemLabel}>
                  センシティブな内容を表示する
                </div>
              </div>
              <div className={styles.sensitiveTypeSettingRadioButtonItemInputDescription}>
                VRCSSを閲覧する際に、R-18の投稿が表示されるようになります
              </div>
            </div>
          </div>
          <div className={styles.accountSettingSaveButtonContainer}>
            <button
              type="submit"
              className={styles.accountSettingSaveButton}
              onClick={handleUpdate}
            >
              設定を保存する
            </button>
          </div>
        </div>

        <div className={styles.accountSettingDeleteButtonContainer}>
          <button
            className={styles.accountSettingDeleteButton}
            onClick={() => openModal(<AccountDelete onClose={closeModal} />)}
          >
            アカウントを削除する
          </button>
        </div>
      </div>
    </div>
  );
};
