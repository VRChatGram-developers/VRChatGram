"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { auth } from "@/libs/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { Link, TextField } from "@mui/material";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) return;

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const token = await credentials.user.getIdToken();
      const result = await signIn("credentials", {
        idToken: token,
        redirect: false,
      });

      if (result?.error) {
        console.error("認証エラー:", result.error);
        return;
      }

      // 成功時の処理
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1 relative h-full">
          <Image
            src="/login_page.png"
            alt="Login page image"
            className="object-cover w-full h-full"
            width={864}
            height={1000}
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md p-8">
            <h1
              style={{ fontSize: "40px" }}
              className="font-bold leading-[40px] tracking-[0.21666669845581055px] text-center font-['October_Devanagari'] mb-2"
            >
              おかえりなさい！
            </h1>
            <p
              style={{ fontSize: "14px" }}
              className="font-bold leading-[14px] tracking-[0.21666669845581055px] text-center font-['October_Devanagari'] mb-8"
            >
              今日も素敵な写真をいっぱい投稿しましょう
            </p>
            <div className="flex flex-col gap-6 w-[260px] mx-auto">
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
              <button
                onClick={handleSignIn}
                style={{
                  height: "56px",
                }}
                className="bg-[#69BEEF] text-white rounded-md hover:bg-[#5CAADB]"
              >
                ログイン
              </button>
              <p
                className="font-['October_Devanagari'] text-[10px] font-[400] leading-[16px] text-center"
              >
                アカウントをお持ちではありませんか？{" "}
                <Link href="/sign-up" className="underline">
                  アカウント作成
                </Link>
              </p>
              <p className="text-center text-[#000000]" style={{ marginTop: "32px", fontSize: "10px" }}>
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
                <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
                <p style={{ marginLeft: "5px" }}>Googleで続行</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
