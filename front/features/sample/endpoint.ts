import { Tests } from "./types/test";

const API_URL = "http://localhost:3000/api/test";

export const fetchBreads = async (): Promise<Tests> => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};