import { Tests, Test } from "./types/test";

const API_GET_URL = "http://localhost:3000/api/test";
const API_POST_URL = "http://localhost:3001/api/test";

export const fetchTests = async (): Promise<Tests> => {
  const response = await fetch(`${API_GET_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const postTest = async (name: string, content: string) => {
  const response = await fetch(`${API_POST_URL}`, {
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

export const findTest = async (id: string): Promise<Test> => {
  const response = await fetch(`${API_GET_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to find test");
  }
  const data = await response.json();
  return data.test;
};

export const updateTest = async (id: string, name: string, content: string) => {
  const response = await fetch(`${API_POST_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, content }),
  });
  if (!response.ok) {
    throw new Error("Failed to update test");
  }
  return response.json();
};

export const deleteTest = async (id: string) => {
  const response = await fetch(`${API_POST_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete test");
  }
  return response.json();
};  