"use client";

import Image from "next/image";
import { Link, TextField } from "@mui/material";
import { useState } from "react";
import styles from "@/features/auth/styles/sign-up-form.module.scss";
import { checkEmail } from "@/features/users/endpoint";

export const SignUpForm = ({
  email,
  password,
  setEmail,
  setPassword,
  setIsSignUp,
}: {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsSignUp: (isSignUp: boolean) => void;
}) => {
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const mailValidation = () => {
    if (email === "") {
      setErrorMail("メールアドレスを入力してください");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[^@.]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMail("正しいメールアドレスを入力してください");
      return false;
    }
    setErrorMail("");
    return true;
  };

  const passwordValidation = () => {
    if (password === "") {
      setErrorPassword("パスワードを入力してください");
      return false;
    }

    if (password.length < 6) {
      setErrorPassword("パスワードは6文字以上で入力してください");
      return false;
    }

    // 半角英字、数字、記号をすべて含むかチェック
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (!(hasLetter && hasNumber && hasSymbol)) {
      setErrorPassword("パスワードは半角英字、数字、記号を含めてください");
      return false;
    }

    setErrorPassword("");
    return true;
  };

  const handleSignUp = async () => {
    const isMailValid = mailValidation();
    const isPasswordValid = passwordValidation();

    if (!isMailValid || !isPasswordValid) {
      return;
    }

    const isEmailExist = await checkEmail(email);
    if (isEmailExist) {
      setErrorMail("このメールアドレスは既に使用されています");
      return;
    }

    setIsSignUp(true);
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupContent}>
        <div className={styles.signupFormContent}>
          <h1
            style={{ fontSize: "40px" }}
            className="font-bold leading-[40px] tracking-[0.21666669845581055px] text-center font-['October_Devanagari'] mb-2"
          >
            アカウントの作成
          </h1>

          <div className={styles.signupTextFormContainer}>
            <div className={styles.textForm}>
              <TextField
                fullWidth
                label="メールアドレス*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "#69BEEF",
                  },
                }}
                sx={{
                  height: "64px",
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "#69BEEF",
                    },
                  },
                }}
              />
              {errorMail && (
                <p className={styles.errorMailMessage}>{errorMail}</p>
              )}
            </div>

            <div className={styles.textForm}>
              <TextField
                fullWidth
                type="password"
                label="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "#69BEEF",
                  },
                }}
                sx={{
                  height: "64px",
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "#69BEEF",
                    },
                  },
                }}
              />
              <p className={styles.warningLabel}>
                パスワードは半角英字、数字、記号を合わせた6文字以上で入力してください
              </p>
              {errorPassword && (
                <p className={styles.errorPasswordMessage}>{errorPassword}</p>
              )}
            </div>
            <div className={styles.createButtonContainer}>
              <button onClick={handleSignUp} className={styles.createButton}>
                作成する
              </button>
            </div>
            <div className={styles.separateLoginContainer}>
              <p className={styles.separateLoginText}>
                既にアカウントをお持ちですか？{" "}
                <Link href="/signin" className="underline">
                  ログイン
                </Link>
              </p>
            </div>
            <div className={styles.separateLoginContainer}>
              <p className={styles.separateLoginText}>
                パスワードを忘れた方は{" "}
                <Link href="/sign-in" className="underline">
                  こちら
                </Link>
              </p>
            </div>

            {/* <div>
              <p
                style={{ marginTop: "16px", fontSize: "10px" }}
                className="text-center text-[#000000] mt-[30px]"
              >
                ---------------------------または---------------------------
              </p>
            </div>

            <div className={styles.googleLoginContainer}>
              <button className={styles.googleLoginButton}>
                <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
                <p className={styles.googleLoginText}>Googleで続行</p>
              </button>
            </div> */}
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
  );
};
