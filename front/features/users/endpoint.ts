import { User } from "./types/user";

const API_GET_URL = "http://localhost:3000";
const API_POST_URL = "http://localhost:3001";

export const fetchUserById = async (id: bigint): Promise<User> => {
    const response = await fetch(`${API_GET_URL}/api/users/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
};

export const followUser = async (id: bigint) => {

    try {
        const response = await fetch(`${API_POST_URL}/api/users/${id}/followings`, {
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
        const response = await fetch(`${API_POST_URL}/api/users/${id}/followings`, {
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
}
