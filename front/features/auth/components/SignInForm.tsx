"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { auth } from "@/libs/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </>
  );
};
