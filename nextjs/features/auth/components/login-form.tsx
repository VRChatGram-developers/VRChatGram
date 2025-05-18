"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { auth } from "@/libs/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { Link, TextField } from "@mui/material";
import styles from "@/features/auth/styles/login-form.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { checkDeletedUser } from "@/features/users/endpoint";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

export const LoginForm = () => {
  const googleFormLinks =
    "https://docs.google.com/forms/d/e/1FAIpQLSc2wPHJNSmD8tBIWMb6UDrJzlXNF3dYFx-okEQvITZvRXpOtQ/viewform";
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
        <div className={styles.loginContainerModal}>
          <ClipLoader color="#69BEEF" size={100} className="w-full h-full" />
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.loginImageContainer}>
            <Image
              src="/login_page.png"
              alt="Login page image"
              className="object-cover w-full h-full"
              width={864}
              height={800}
            />
          </div>
          <div className={styles.loginContent}>
            <div className={styles.loginFormContent}>
              <h1
                style={{ fontSize: "40px" }}
                className="font-bold leading-[40px] tracking-[0.21666669845581055px] text-center font-['October_Devanagari'] mb-2"
              >
                おかえりなさい！
              </h1>
              <p className={styles.loginFormContentSubTitle}>
                今日も素敵な写真をいっぱい投稿しましょう
              </p>

              <div className={styles.loginTextFormContainer}>
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
                  {errorMail && <p className={styles.errorMailMessage}>{errorMail}</p>}
                </div>

                <div className={styles.textForm}>
                  <div className={styles.loginFormPasswordContainer}>
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
                </div>
                <div className={styles.createButtonContainer}>
                  <button onClick={handleSignIn} className={styles.createButton}>
                    ログイン
                  </button>
                </div>
                <div className={styles.separateLoginContainer}>
                  <p className={styles.separateLoginText}>
                    アカウントをお持ちではありませんか？{" "}
                    <Link href="/signup" className="underline">
                      アカウント作成
                    </Link>
                  </p>
                </div>
                <div className={styles.separateLoginContainer}>
                  <p className={styles.separateLoginText}>
                    パスワードを忘れた方は{" "}
                    <Link href="/reset-password" className="underline">
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
        </div>
      )}
    </>
  );
};
