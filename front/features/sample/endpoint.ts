import { Tests } from "./types/test";

const API_GET_URL = "http://localhost:3000/api/test";
const API_POSTURL = "http://localhost:3001/api/test";


export const fetchBreads = async (): Promise<Tests> => {
  const response = await fetch(`${API_GET_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const postTest = async (name: string, content: string) => {
  const response = await fetch(`${API_POSTURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, content }),
  });
  if (!response.ok) {
    throw new Error("Failed to post test");
  }
  return response.json();
};
