import { User, requestCreateUser } from "./types/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/client";

const API_URL = "http://localhost:3000";

export const fetchUserById = async (id: bigint): Promise<User> => {
  const response = await fetch(`${API_URL}/api/v1/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
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
    const createdUser = await createUserWithEmailAndPassword(auth, user.email, user.password);

    const response = await fetch(`${API_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        uid: createdUser.user.uid,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};
