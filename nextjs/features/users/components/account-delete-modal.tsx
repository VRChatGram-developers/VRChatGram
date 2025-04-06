"use client";
import { deleteAccount, checkPassword } from "../endpoint";
import { logOutWithFirebaseAuth } from "@/libs/firebase/firebase-auth";
import { useState } from "react";

export const AccountDeleteModal = ({ onClose }: { onClose: () => void }) => {
  const [password, setPassword] = useState("");
  const [errorPasswordMessage, setPasswordErrorPasswordMessage] = useState("");

  const handleDeleteAccount = async () => {
    const isValidPassword = await checkPassword(password);

    if (!isValidPassword) {
      setPasswordErrorPasswordMessage("パスワードが正しくありません");
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
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h1>アカウント削除</h1>
      <p>削除すると、以下の情報がすべて失われます。</p>
      <div>
        <div>・プロフィール情報</div>
        <div>・写真データ</div>
        <div>・お気に入り</div>
        <div>・フォロー/フォロワー</div>
      </div>
      <div>
        <p>続けるには、VRCSSのパスワードを入力してください</p>
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {errorPasswordMessage && <p className="text-red-500">{errorPasswordMessage}</p>}
      <button onClick={handleDeleteAccount}>アカウントを削除</button>
    </div>
  );
};
