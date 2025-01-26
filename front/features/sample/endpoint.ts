import { Breads } from "./types/bread";

const API_URL = "https://catfact.ninja";

export const fetchBreads = async (): Promise<Breads> => {
  const response = await fetch(`${API_URL}/breeds`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};