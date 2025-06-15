import {
  FavoritePostList,
  User,
  UserForHeader,
  ViewsPostList,
  requestCreateUser,
  requestUpdateUserProfile,
  requestUpdateUser,
  IsDeletedUser,
} from "./types/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/client";
import { signIn } from "next-auth/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

    let userCredential;
    if (!user.isGoogleLogin) {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Google login時のユーザー作成
      const provider = new GoogleAuthProvider();
      userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      const email = userCredential.user.email;

      const response = await fetch(`${API_URL}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, uid: userCredential.user.uid, email: email }),
      });

      await signIn("credentials", {
        idToken: token,
        redirect: false,
      });

      const data = await response.json();
      return data;
    }

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

export const fetchByAccountSettings = async (headers: Headers) => {
  const response = await fetch(`${API_URL}/api/v1/users/account-settings`, {
    headers: new Headers(headers),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch account settings");
  }
  const data = await response.json();
  return data;
};

export const updateUser = async (user: requestUpdateUser) => {
  const response = await fetch(`${API_URL}/api/v1/users/account-settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  const data = await response.json();
  return data;
};

export const updateUserEmail = async (currentEmail: string, newEmail: string) => {
  const response = await fetch(`${API_URL}/api/v1/users/account-settings/email`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentEmail: currentEmail, newEmail: newEmail }),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  const data = await response.json();
  return data;
};

export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  const response = await fetch(`${API_URL}/api/v1/users/account-settings/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword: currentPassword, newPassword: newPassword }),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  const data = await response.json();
  return data;
};

export const checkPassword = async (password: string) => {
  const response = await fetch(`${API_URL}/api/v1/users/check/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    throw new Error("Failed to password");
  }
  const data = await response.json();
  return data;
};

export const deleteAccount = async () => {
  const response = await fetch(`${API_URL}/api/v1/users/account-settings`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  const data = await response.json();
  return data;
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

export const checkDeletedUser = async (email: string): Promise<IsDeletedUser> => {
  const response = await fetch(`${API_URL}/api/v1/users/check/deleted-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    console.error(response);
    return { isDeleted: false };
  }
  const data = await response.json();
  return data;
};

export const blockUser = async (blockedUserMyId: string): Promise<IsDeletedUser> => {
  const response = await fetch(`${API_URL}/api/v1/users/blocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blockedUserMyId }),
  });
  if (!response.ok) {
    console.error(response);
    return { isDeleted: false };
  }
  const data = await response.json();
  return data;
};

export const unblockUser = async (blockedUserMyId: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/v1/users/blocks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blockedUserMyId }),
  });
  if (!response.ok) {
    console.error(response);
    return false;
  }
  return true;
};

export const fetchS3SignedUrl = async ({
  fileName,
  contentType,
}: {
  fileName: string | null;
  contentType: string;
}): Promise<{ url: string } | string> => {
  const response = await fetch(`${API_URL}/api/v1/s3`, {
    method: "POST",
    body: JSON.stringify({ fileName, contentType }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch S3 signed url";
  }
  const data = await response.json();
  return data;
};

export const checkRegisteredByUid = async (uid: string): Promise<boolean | string> => {
  const response = await fetch(`${API_URL}/api/v1/users/check_registered_by_uid`, {
    method: "POST",
    body: JSON.stringify({ uid }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to check registered by uid";
  }
  const data = await response.json();
  return data.isRegisteredByUid;
};
