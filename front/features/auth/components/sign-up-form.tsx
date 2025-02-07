"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { Link, TextField } from "@mui/material";
import { auth } from "@/libs/firebase/client";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md p-8">
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
                <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
                <p style={{ marginLeft: "5px" }}>Googleで続行</p>
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
