import { User, requestCreateUser, requestUpdateUserProfile } from "./types/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/client";
import { signIn } from "next-auth/react";

const API_URL = "http://localhost:3000";

export const fetchUserById = async (id: string, headers: Headers): Promise<User> => {
  const response = await fetch(`${API_URL}/api/v1/users/${id}`, {
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data;
};

export const followUser = async (id: bigint) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/${id}/followings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to follow user");
  }
};

export const unfollowUser = async (id: bigint) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/${id}/followings`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to unfollow user");
  }
};

export const createUser = async (user: requestCreateUser) => {
  try {
    const { password, email, ...userData } = user;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const response = await fetch(`${API_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...userData, uid: userCredential.user.uid, email: email }),
    });

    const token = await userCredential.user.getIdToken();
    await signIn("credentials", {
      idToken: token,
      redirect: false,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};

export const checkEmail = async (email: string) => {
  const response = await fetch(`${API_URL}/api/v1/users/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error("Failed to check email");
  }
  const data = await response.json();
  return data.isRegisteredEnail;
};

export const updateUserProfile = async (requestUpdateUserProfile: requestUpdateUserProfile) => {
  const response = await fetch(`${API_URL}/api/v1/users/${requestUpdateUserProfile.id}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestUpdateUserProfile),
  });
  if (!response.ok) {
    throw new Error("Failed to update user introduction");
  }
  const data = await response.json();
  return data;
};
