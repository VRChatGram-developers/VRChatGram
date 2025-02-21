import { auth } from "./client";
import { signOut as signOutWithNextAuth } from "next-auth/react";

export function logOutWithFirebaseAuth() {
  auth
    .signOut()
    .then(() => {
      signOutWithNextAuth({ callbackUrl: `/` });
    })
    .catch((error) => {
      console.error("Error Sign Out with Google", error);
    });
}
