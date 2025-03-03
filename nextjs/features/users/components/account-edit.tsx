"use client";

import { useState } from "react";
import { updateUser } from "../endpoint";
import { useRouter } from "next/navigation";
import { AccountSetting } from "../types";
import { useModal } from "@/provider/modal-provider";
import { AccountDeleteModal } from "./account-delete-modal";
import { checkAuth } from "../endpoint";
export const AccountEdit = ({ accountSetting }: { accountSetting: AccountSetting }) => {
  const [email, setEmail] = useState(accountSetting.email);
  const { openModal, closeModal } = useModal();
  const [showSensitiveType, setShowSensitiveType] = useState(accountSetting.show_sensitive_type);
  const [gender, setGender] = useState(accountSetting.gender);
  const [currentPassword, setCurrentPassword] = useState(accountSetting.currentPassword);
  const [newPassword, setNewPassword] = useState(accountSetting.newPassword);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
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

  const isValidEmail = () => {
    setErrorEmail("");
    if (email === "") {
      setErrorEmail("メールアドレスを入力してください");
      return false;
    }
    return true;
  };

  const isValidCurrentPassword = () => {
    setErrorCurrentPassword("");
    if (currentPassword === "") {
      setErrorCurrentPassword("現在のパスワードを入力してください");
      return false;
    }
    return true;
  };

  const isValidNewPassword = () => {
    setErrorNewPassword("");
    if (newPassword === "") {
      setErrorNewPassword("新しいパスワードを入力してください");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValidEmail()) return;
    if (!isValidCurrentPassword()) return;
    if (!isValidNewPassword()) return;

    try {
      await checkAuth(email, currentPassword);
    } catch (error) {
      console.error(error);
    }
    
    const data = {
      email,
      show_sensitive_type: showSensitiveType,
      gender,
      currentPassword,
      newPassword,
    };

    console.log(`console.log(data);`);
    console.log(data);
    return;

    try {
      await updateUser({
        email,
        show_sensitive_type: showSensitiveType,
        gender,
        currentPassword,
        newPassword,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>アカウント編集</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="email">メールアドレス</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="currentPassword">現在のパスワード</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label htmlFor="newPassword">新しいパスワード</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="gender">性別</label>
          <div className="flex flex-row items-center justify-center">
            {genderList.map((genderItem) => (
              <label key={genderItem.value}>
                <input
                  type="radio"
                  value={genderItem.value}
                  checked={gender == genderItem.value}
                  onChange={(e) => setGender(e.target.value)}
                />
                {genderItem.label}
              </label>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-bold">センシティブな内容の表示設定を変更する</div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showSensitiveType === "all"}
                  onChange={handleShowSensitiveType}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-red-500 transition">
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                      showSensitiveType === "all" ? "translate-x-5" : ""
                    }`}
                  />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  センシティブな内容を表示する
                </span>
              </label>
            </div>
          </div>
          <button type="submit" className="bg-[#9BEA4D] text-white px-4 py-2 rounded">
            設定を保存する
          </button>
        </div>
      </form>

      <div>
        <button onClick={() => openModal(<AccountDeleteModal onClose={closeModal} />)}>
          アカウントを削除する
        </button>
      </div>
    </div>
  );
};
