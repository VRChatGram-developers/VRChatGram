import { User } from "./types/user";

const API_GET_URL = "http://localhost:3000";

export const fetchUserById = async (id: bigint): Promise<User> => {
    const response = await fetch(`${API_GET_URL}/api/users/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
};

