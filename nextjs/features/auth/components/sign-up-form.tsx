"use client";

import Image from "next/image";
import { Link, TextField } from "@mui/material";
import { useState } from "react";
import styles from "@/features/auth/styles/sign-up-form.module.scss";
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

    setErrorPassword("");
    return true;
  };

  const handleSignUp = () => {
    const isMailValid = mailValidation();
    const isPasswordValid = passwordValidation();

    if (!isMailValid || !isPasswordValid) {
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

          <div className="flex flex-col gap-6 w-[260px] mx-auto">
            <TextField
              fullWidth
              label="メールアドレス*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              style={{ marginTop: "48px" }}
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
            {errorPassword && (
              <p className={styles.errorPasswordMessage}>{errorPassword}</p>
            )}
            <button
              onClick={handleSignUp}
              style={{
                height: "56px",
                marginTop: "8px",
              }}
              className="bg-[#69BEEF] text-white rounded-md hover:bg-[#5CAADB]"
            >
              作成する
            </button>
            <p className="font-['October_Devanagari'] text-[10px] font-[400] leading-[16px] text-center">
              既にアカウントをお持ちですか？{" "}
              <Link href="/sign-in" className="underline">
                ログイン
              </Link>
            </p>
            <p
              style={{ marginTop: "16px", fontSize: "10px" }}
              className="text-center text-[#000000] mt-[30px]"
            >
              ---------------------------または---------------------------
            </p>
            <button
              style={{
                border: "1px solid #B2B2B2",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="text-[#000000] rounded-md hover:bg-gray-200"
            >
              <Image
                src="/google-icon.png"
                alt="Google Icon"
                width={24}
                height={24}
              />
              <p style={{ marginLeft: "5px" }}>Googleで続行</p>
            </button>
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
