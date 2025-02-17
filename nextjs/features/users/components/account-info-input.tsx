"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/features/users/styles/users-register.module.scss";
import { createUser } from "../endpoint";
import { useRouter } from "next/navigation";

export const AccountInfoInput = ({ email, password }: { email: string; password: string }) => {
  const router = useRouter();
  const years = Array.from({ length: 100 }, (_, index) => 2025 - index); // 2025年から遡る
  const months = Array.from({ length: 12 }, (_, index) => index + 1); // 1月から12月
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const sexOptions = [
    { label: "男", value: "male" },
    { label: "女", value: "female" },
    { label: "どちらでもない", value: "other" },
  ];

  const [name, setName] = useState<string>("");
  const [year, setYear] = useState<number | string>("");
  const [month, setMonth] = useState<number | string>("");
  const [day, setDay] = useState<number | string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const [errorName, setErrorName] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");
  const [errorSex, setErrorSex] = useState("");
  const [errorTerms, setErrorTerms] = useState("");

  const checkNickName = () => {
    if (name === "") {
      setErrorName("ニックネームを入力してください");
      return false;
    }
    return true;
  };

  const checkBirthday = () => {
    if (year === "" || month === "" || day === "") {
      setErrorBirthday("誕生日を選択してください");
      return false;
    }
    return true;
  };

  const checkSex = () => {
    if (selectedSex === "") {
      setErrorSex("性別を選択してください");
      return false;
    }
    return true;
  };

  const checkTerms = () => {
    if (!termsChecked) {
      setErrorTerms("利用規約に同意してください");
      return false;
    }
    return true;
  };

  const handleCreateAccount = async () => {
    const isNickNameValid = checkNickName();
    const isBirthdayValid = checkBirthday();
    const isSexValid = checkSex();
    const isTermsValid = checkTerms();

    try {
      if (!isNickNameValid || !isBirthdayValid || !isSexValid || !isTermsValid) {
        return;
      }

      const birthday = `${year}-${month}-${day}`;

      const data = {
        email: email,
        password: password,
        name: name,
        birthday: birthday,
        gender: selectedSex,
      };

      await createUser(data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1 flex items-center justify-center">
          <div className={styles.registerContainer}>
            <div className={styles.registerTitle}>
              <p>アカウント作成</p>
            </div>
            <div className={styles.registerContent}>
              <div className={styles.nickName}>
                <div className={styles.nicknameLabel}>
                  <p>ニックネーム</p>
                </div>
                <div className={styles.nicknameInput}>
                  <input
                    type="text"
                    placeholder="ニックネーム"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <p>あなたの名前として表示されます</p>
                {errorName && <p className={styles.errorNameMessage}>{errorName}</p>}
              </div>
              <div>
                {sexOptions.map((option) => (
                  <label key={option.value} className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={selectedSex === option.value}
                      onChange={(e) => setSelectedSex(e.target.value)}
                    />
                    {option.label}
                  </label>
                ))}
                {errorSex && <p className={styles.errorSexMessage}>{errorSex}</p>}
              </div>
              <div>
                <label htmlFor="birthday">誕生日</label>
                <div>
                  <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">年</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>

                  <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">月</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">日</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errorBirthday && <p className={styles.errorBirthdayMessage}>{errorBirthday}</p>}
                </div>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                  />
                  <span>
                    <a href="/terms" target="_blank">
                      利用規約
                    </a>{" "}
                    と
                    <a href="/privacy" target="_blank">
                      プライバシーポリシー
                    </a>{" "}
                    に同意する
                  </span>
                </label>
                {errorTerms && <p className={styles.errorTermsMessage}>{errorTerms}</p>}
              </div>
            </div>
            <div>
              <button onClick={handleCreateAccount} className={styles.userCreateButton}>
                アカウント作成
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative h-full">
          <Image
            src="/signup-icon.png"
            alt="Login page image"
            className="object-cover w-full h-full"
            width={864}
            height={800}
          />
        </div>
      </div>
    </>
  );
};
