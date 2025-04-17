"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserEmail } from "../endpoint";

type EmailSettingProps = {
  onClose: () => void;
  currentEmail: string;
};

export const EmailSetting = ({ onClose, currentEmail }: EmailSettingProps) => {
  const [email, setEmail] = useState(currentEmail);
  const [newEmail, setNewEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorNewEmail, setErrorNewEmail] = useState("");
  const router = useRouter();

  const isValidEmail = () => {
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

    return true;
  };

  const isValidNewEmail = () => {
    setErrorNewEmail("");
    if (newEmail === "") {
      setErrorNewEmail("メールアドレスを入力してください");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[^@.]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail("正しいメールアドレスを入力してください");
      return false;
    }

    return true;
  };

  const handleUpdateEmail = async () => {
    const isValidEmailResult = isValidEmail();
    const isValidNewEmailResult = isValidNewEmail();
    if (!isValidEmailResult || !isValidNewEmailResult) {
      return;
    }

    try {
      await updateUserEmail(email, newEmail);
    } catch (error) {
      console.error(error);
    }

    onClose();
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div>メールアドレスの変更</div>
      <div>
        <div>現在のメールアドレス</div>
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errorEmail.length > 0 && <div>{errorEmail}</div>}
        </div>
      </div>
      <div>
        <div>新しいメールアドレス</div>
        <div>
          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          {errorNewEmail.length > 0 && <div>{errorNewEmail}</div>}
        </div>
      </div>
      <button onClick={handleUpdateEmail}>変更する</button>
    </div>
  );
};
