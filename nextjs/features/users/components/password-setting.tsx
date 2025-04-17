"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserPassword } from "../endpoint";

type PasswordSettingProps = {
  onClose: () => void;
};

export const PasswordSetting = ({ onClose }: PasswordSettingProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const router = useRouter();

  const isValidCurrentPassword = () => {
    setErrorCurrentPassword("");
    if (currentPassword === "") {
      return true;
    }

    if (currentPassword.length < 6) {
      setErrorNewPassword("パスワードは6文字以上で入力してください");
      return false;
    }
    return true;
  };

  const isValidNewPassword = () => {
    setErrorNewPassword("");
    if (newPassword === "") {
      return true;
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
    } catch (error) {
      console.error(error);
    }

    onClose();
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div>パスワードの変更</div>
      <div>
        <div>現在のパスワード</div>
        <div>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {errorCurrentPassword.length > 0 && <div>{errorCurrentPassword}</div>}
        </div>
      </div>
      <div>
        <div>新しいパスワード</div>
        <div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errorNewPassword.length > 0 && <div>{errorNewPassword}</div>}
        </div>
      </div>
      <button onClick={handleUpdatePassword}>変更する</button>
    </div>
  );
};
