import { TopThreePostImages } from "./type/index";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchTopThreePostImages = async (): Promise<TopThreePostImages | string> => {
  const response = await fetch(`${API_URL}/api/v1/posts/popular-image`, {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch popular posts";
  }
  const data = await response.json();
  return data;
};
