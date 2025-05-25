"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/features/users/styles/account-info-input.module.scss";
import { createUser } from "../../endpoint";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { createYears, createMonths, createDays } from "@/utils/date";
import { checkDuplicateMyId } from "../../endpoint";

export const AccountInfoInput = ({
  email,
  password,
  setIsSignUp,
}: {
  email: string;
  password: string;
  setIsSignUp: (isSignUp: boolean) => void;
}) => {
  const router = useRouter();
  const sexOptions = [
    { label: "男", value: "male" },
    { label: "女", value: "female" },
    { label: "どちらでもない", value: "other" },
  ];

  const [name, setName] = useState<string>("");
  const [myId, setMyId] = useState<string>("");
  const [year, setYear] = useState<number | string>("");
  const [month, setMonth] = useState<number | string>("");
  const [day, setDay] = useState<number | string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorName, setErrorName] = useState("");
  const [errorMyId, setErrorMyId] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");
  const [errorSex, setErrorSex] = useState("");
  const [errorTerms, setErrorTerms] = useState("");

  const { status } = useSession();

  const isValidNickName = () => {
    setErrorName("");
    if (name === "") {
      setErrorName("ニックネームを入力してください");
      return false;
    }
    return true;
  };

  const isRegisteredMyId = async () => {
    if (await checkDuplicateMyId(myId)) {
      setErrorMyId("このmy_idは既に使用されています");
      return false;
    }
    return true;
  };

  const isValidMyId = async () => {
    setErrorMyId("");
    if (myId === "") {
      setErrorMyId("my_idを入力してください");
      return false;
    }

    return true;
  };

  const isValidBirthday = () => {
    setErrorBirthday("");
    if (year === "" || month === "" || day === "") {
      setErrorBirthday("生年月日を選択してください");
      return false;
    }
    return true;
  };

  const isValidSex = () => {
    setErrorSex("");
    if (selectedSex === "") {
      setErrorSex("性別を選択してください");
      return false;
    }
    return true;
  };

  const isValidTerms = () => {
    setErrorTerms("");
    if (!termsChecked) {
      setErrorTerms("利用規約に同意してください");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleCreateAccount = async () => {
    try {
      if (
        !isValidNickName() ||
        !isValidMyId() ||
        !isValidBirthday() ||
        !isValidSex() ||
        !isValidTerms()
      ) {
        return;
      }

      if (!(await isRegisteredMyId())) {
        return;
      }

      setIsLoading(true);

      await createUser({
        email: email,
        password: password,
        name: name,
        my_id: myId,
        birthday: {
          year: Number(year),
          month: Number(month),
          day: Number(day),
        },
        gender: selectedSex,
      });
    } catch (error) {
      setIsLoading(false);
      setIsSignUp(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.registerContainer}>
            <div className={styles.registerContent}>
              <div className={styles.registerTitleContent}>
                <p className={styles.registerTitle}>アカウント作成</p>
              </div>
              <div className={styles.registerContentDetail}>
                <div className={styles.nameContainer}>
                  <p className={styles.nameLabel}>ニックネーム</p>
                  <div className={styles.nameForm}>
                    <input
                      type="text"
                      placeholder="ニックネーム"
                      value={name}
                      className={styles.nameFormInput}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <p className={styles.warningLabel}>あなたの名前として表示されます</p>
                  {errorName && <p className={styles.errorNameMessage}>{errorName}</p>}
                </div>
                <div className={styles.myIdContainer}>
                  <p className={styles.myIdLabel}>my_id</p>
                  <div className={styles.myIdForm}>
                    <input
                      type="text"
                      placeholder="my_id"
                      value={myId}
                      className={styles.myIdFormInput}
                      onChange={(e) => setMyId(e.target.value)}
                    />
                  </div>
                  {errorMyId && <p className={styles.errorMyIdMessage}>{errorMyId}</p>}
                </div>
                <div className={styles.genderContainer}>
                  <p className={styles.genderLabel}>性別</p>
                  <div className={styles.genderSelectSection}>
                    {sexOptions.map((option) => (
                      <label key={option.value} className={styles.genderSelectLabel}>
                        <input
                          type="radio"
                          name="gender"
                          className={styles.genderSelectInput}
                          value={option.value}
                          checked={selectedSex === option.value}
                          onChange={(e) => setSelectedSex(e.target.value)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>

                  {errorSex && <p className={styles.errorSexMessage}>{errorSex}</p>}
                </div>
                <div className={styles.birthdayContainer}>
                  <p className={styles.birthdayLabel}>生年月日</p>
                  <div className={styles.birthdayContent}>
                    <div className={styles.birthdaySelectContent}>
                      <select
                        id="year"
                        className={styles.birthdaySelect}
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                      >
                        <option value="">年</option>
                        {createYears().map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.birthdaySelectContent}>
                      <select
                        id="month"
                        className={styles.birthdaySelect}
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                      >
                        <option value="">月</option>
                        {createMonths().map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.birthdaySelectContent}>
                      <select
                        id="day"
                        className={styles.birthdaySelect}
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      >
                        <option value="">日</option>
                        {createDays(Number(year), Number(month)).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      {errorBirthday && (
                        <p className={styles.errorBirthdayMessage}>{errorBirthday}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.confirmationContainer}>
                  <label className={styles.confirmationLabel}>
                    <input
                      type="checkbox"
                      className={styles.confirmationCheckbox}
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                    />
                    <span>
                      <a href="/terms" target="_blank" className={styles.linkText}>
                        利用規約
                      </a>{" "}
                      と
                      <a href="/privacy" target="_blank" className={styles.linkText}>
                        プライバシーポリシー
                      </a>{" "}
                      に同意する
                    </span>
                  </label>
                  {errorTerms && <p className={styles.errorTermsMessage}>{errorTerms}</p>}
                </div>
                <div className={styles.signupContent}>
                  <button onClick={handleCreateAccount} className={styles.userCreateButton}>
                    アカウントを作成
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.registerImageContainer}>
            <Image
              src="/signup-icon.png"
              alt="Login page image"
              className="object-cover w-full h-full"
              width={864}
              height={800}
            />
          </div>
        </div>
      )}
    </>
  );
};
