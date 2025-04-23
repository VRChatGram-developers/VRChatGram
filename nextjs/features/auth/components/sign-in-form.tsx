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
import { checkDeletedUser } from "@/features/users/endpoint";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [fireBaseError, setFireBaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);

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
      const userStatus = await checkDeletedUser(email);
      if (userStatus.isDeleted === true) {
        setIsLoading(false);
        setFireBaseError("既に退会しているユーザーです");
        return;
      }
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
    } catch (error) {
      setIsLoading(false);
      setFireBaseError("パスワードまたはメールアドレスが間違っています");
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.signInFormContainerModal}>
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      ) : (
        <div className={styles.signInFormContainer}>
          <div className={styles.signInFormContainerImageWrapper}>
            <Image
              src="/login_page.png"
              alt="Login page image"
              className={styles.signInFormContainerImage}
              width={864}
              height={1000}
            />
          </div>
          <div className={styles.signInFormCntentContainer}>
            <div className={styles.signInFormContentWrapper}>
              <h1 className={styles.signInFormContentTitle}>おかえりなさい！</h1>
              <p className={styles.signInFormContentSubTitle}>
                今日も素敵な写真をいっぱい投稿しましょう
              </p>
              {fireBaseError && <p className={styles.errorMailMessage}>{fireBaseError}</p>}
              <div className={styles.signInFormContentInputContainer}>
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
                    height: "60px",
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
                {errorMail && <p className={styles.errorMailMessage}>{errorMail}</p>}
                <div className={styles.signInFormContentPasswordContainer}>
                  <TextField
                    fullWidth
                    type={isCurrentPasswordVisible ? "text" : "password"}
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
                      height: "60px",
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
                  {isCurrentPasswordVisible ? (
                    <IoEyeOffSharp
                      className={styles.eyeIconSlash}
                      onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
                    />
                  ) : (
                    <IoEyeSharp
                      className={styles.eyeIcon}
                      onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
                    />
                  )}
                </div>
                {errorPassword && <p className={styles.errorPasswordMessage}>{errorPassword}</p>}
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
