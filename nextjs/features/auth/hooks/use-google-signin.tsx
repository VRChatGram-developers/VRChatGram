import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth } from "@/libs/firebase/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkRegisteredByUid } from "@/features/users/endpoint";

export const useGoogleSignIn = () => {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      sessionStorage.setItem("googleLogin", "true");

      provider.setCustomParameters({
        prompt: "select_account",
      });

      // if (isMobile()) {
      //   await signInWithRedirect(auth, provider); // This never returns.
      // } else {
      //     await signInWithPopup(auth, provider); // This does return.
      // }
      await signInWithRedirect(auth, provider); // This does return.
    } catch (error) {
      sessionStorage.removeItem("googleLogin");
      console.error(error);
    }
  };

  const fetchGoogleCredentials = async () => {
    console.log("fetchGoogleCredentials", auth);

    const result = await getRedirectResult(auth);
    console.log("result", result);

    if (result !== null) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      const isRegisteredByUid = await checkRegisteredByUid(user.uid);
      if (isRegisteredByUid) {
        signIn("credentials", {
          idToken: token,
          redirect: false,
        });
      } else {
        sessionStorage.setItem("googleLogin", "true");
        router.push("/signup");
      }
    } else {
      // await signInWithRedirect(auth, new GoogleAuthProvider());
    }
  };

  return { handleGoogleSignIn, fetchGoogleCredentials };
};
