import {
  FavoritePostList,
  User,
  UserForHeader,
  ViewsPostList,
  requestCreateUser,
  requestUpdateUserProfile,
} from "./types/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/client";
import { signIn } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserById = async (myId: string, headers: Headers): Promise<User | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/profile/${myId}`, {
    headers: new Headers(headers),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch users";
  }
  const data = await response.json();
  return data;
};

export const followUser = async (myId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/${myId}/followings`, {
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

export const unfollowUser = async (myId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/${myId}/followings`, {
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

      body: JSON.stringify({
        ...userData,
        uid: userCredential.user.uid,
        email: email,
        birthday: {
          year: userData.birthday.year,
          month: userData.birthday.month,
          day: userData.birthday.day,
        },
      }),
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
export const checkEmail = async (email: string): Promise<boolean | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to check email";
  }
  const data = await response.json();
  return data.isRegisteredEnail;
};

export const checkDuplicateMyId = async (myId: string): Promise<boolean | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/check_duplicate_my_id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ my_id: myId }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to check duplicate my_id";
  }
  const data = await response.json();
  return data.isRegisteredMyId;
};

export const updateUserProfile = async (
  requestUpdateUserProfile: requestUpdateUserProfile
): Promise<string> => {
  const response = await fetch(`${API_URL}/api/v1/users/profile/${requestUpdateUserProfile.myId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestUpdateUserProfile),
  });
  if (!response.ok) {
    return "Failed to update user introduction";
  }
  const data = await response.json();
  return data;
};

export const fetchUserForHeader = async (): Promise<UserForHeader | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/header`);
  if (!response.ok) {
    return "Failed to fetch user for header";
  }
  const data = await response.json();
  return data;
};

export const fetchMyViewsPosts = async (headers: Headers): Promise<ViewsPostList | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/views`, {
    headers: new Headers(headers),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch users";
  }
  const data = await response.json();
  return data;
};

export const fetchMyLikePostList = async (headers: Headers): Promise<FavoritePostList | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/likes`, {
    headers: new Headers(headers),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch users";
  }
  const data = await response.json();
  return data;
};