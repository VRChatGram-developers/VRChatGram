"use client";

import { useState } from "react";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { AccountInfoInput } from "@/features/users/components/account-info-input";

export const UserCreate = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {isSignUp ? (
        <AccountInfoInput email={email} password={password} />
      ) : (
        <SignUpForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setIsSignUp={setIsSignUp}
        />
      )}
    </div>
  );
};
