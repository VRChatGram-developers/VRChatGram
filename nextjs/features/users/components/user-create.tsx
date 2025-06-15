"use client";

import { useState, useEffect } from "react";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { AccountInfoInput } from "@/features/users/components/account-info-input";
import { TopThreePostImages as TopThreePostImagesType } from "@/features/auth/type";

export const UserCreate = ({
  topThreePostImages,
}: {
  topThreePostImages: TopThreePostImagesType;
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpCompleted, setIsSignUpCompleted] = useState<boolean>(false);

  useEffect(() => {
    const googleLogin = sessionStorage.getItem("googleLogin");
    if (googleLogin) {
      setIsSignUpCompleted(true);
    }
  }, []);

  return (
    <div>
      {isSignUp ? (
        <AccountInfoInput
          email={email}
          password={password}
          setIsSignUp={setIsSignUp}
          topThreePostImages={topThreePostImages}
          setIsSignUpCompleted={setIsSignUpCompleted}
        />
      ) : (
        <SignUpForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setIsSignUp={setIsSignUp}
          topThreePostImages={topThreePostImages}
          setIsSignUpCompleted={setIsSignUpCompleted}
        />
      )}
    </div>
  );
};
