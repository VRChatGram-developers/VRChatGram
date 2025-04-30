"use client";

// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { updateUserEmail } from "../endpoint";
import styles from "../styles/sign-in-form-modal.module.scss";
import { checkDeletedUser } from "@/features/users/endpoint";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Link, TextField } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";


export const SignInFormModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [fireBaseError, setFireBaseError] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  //   const router = useRouter();

  const isEmailValidated = () => {
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
    setErrorEmail("");
    return true;
  };

  const isPasswordValidated = () => {
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
      onClose();
    }
  }, [status, session, onClose]);

  const handleSignIn = async () => {
    setFireBaseError("");
    const isEmailValidatedResult = isEmailValidated();
    const isPasswordValidatedResult = isPasswordValidated();

    if (!isEmailValidatedResult || !isPasswordValidatedResult) {
      return;
    }

    try {
      const userStatus = await checkDeletedUser(email);
      if (userStatus.isDeleted === true) {
        return;
      }
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const token = await credentials.user.getIdToken();
      const result = await signIn("credentials", {
        idToken: token,
        redirect: false,
      });

      if (result?.error) {
        setFireBaseError("パスワードまたはメールアドレスが間違っています");
        console.error("認証エラー:", result.error);
        return;
      }
    } catch (error) {
      setFireBaseError("パスワードまたはメールアドレスが間違っています");
      console.error(error);
    }
  };

  return (
    <div className={styles.signInFormModalContainer}>
      <div className={styles.signInFormModalContentContainer}>
        <div className={styles.signInFormModalTitleContainer}>
          <div className={styles.signInFormModalTitle}>いいねをするにはログインが必要です</div>
          {fireBaseError.length > 0 && (
            <div className={styles.signInFormModalErrorMessage}>{fireBaseError}</div>
          )}
        </div>

        <div className={styles.signInFormModalInputContainer}>
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
          {errorEmail.length > 0 && (
            <div className={styles.signInFormModalErrorMessage}>{errorEmail}</div>
          )}
        </div>
        <div className={styles.signInFormModalInputContainer}>
          <div>
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
            {errorPassword.length > 0 && (
              <div className={styles.signInFormModalErrorMessage}>{errorPassword}</div>
            )}
          </div>
        </div>
      </div>

      <div onClick={handleSignIn} className={styles.signInFormModalButtonContainer}>
        <button className={styles.signInFormModalButton}>ログイン</button>
      </div>
      <p className="font-['October_Devanagari'] text-[10px] font-[400] leading-[16px]">
        アカウントをお持ちではありませんか？{" "}
        <Link href="/signup" className="underline">
          アカウント作成
        </Link>
      </p>
    </div>
  );
};
