"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { auth } from "@/libs/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { Link, TextField } from "@mui/material";
import styles from "@/features/auth/styles/sign-in-form.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [fireBaseError, setFireBaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const mailValidation = () => {
    setErrorMail("");

    if (email === "") {
      setErrorMail("メールアドレスを入力してください");
      return false;
    }
    setErrorMail("");
    return true;
  };

  const passwordValidation = () => {
    setErrorPassword("");

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

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  const handleSignIn = async () => {
    setFireBaseError("");

    const isMailValid = mailValidation();
    const isPasswordValid = passwordValidation();

    if (!isMailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await credentials.user.getIdToken();
      const result = await signIn("credentials", {
        idToken: token,
        redirect: false,
      });

      if (result?.error) {
        console.error("認証エラー:", result.error);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      setFireBaseError("パスワードまたはメールアドレスが間違っています");
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      ) : (
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
              {fireBaseError && (
                <p className={styles.errorMailMessage}>{fireBaseError}</p>
              )}
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
                  onClick={handleSignIn}
                  style={{
                    height: "56px",
                    marginTop: "16px",
                  }}
                  className="bg-[#69BEEF] text-white rounded-md hover:bg-[#5CAADB]"
                >
                  ログイン
                </button>
                <p className="font-['October_Devanagari'] text-[10px] font-[400] leading-[16px] text-center">
                  アカウントをお持ちではありませんか？{" "}
                  <Link href="/signup" className="underline">
                    アカウント作成
                  </Link>
                </p>
                {/* <p
                  className="text-center text-[#000000]"
                  style={{ marginTop: "16px", fontSize: "10px" }}
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
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
