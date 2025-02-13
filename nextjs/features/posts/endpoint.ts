import { Post, Tag, PostDetail } from "./types/index";

export const fetchPosts = async (params: { page?: number; query?: string }): Promise<Post[][]> => {
  const response = await fetch(
    `http://localhost:3000/api/v1/posts/search?${
      params ? `page=${params.page}&query=${params.query}` : ""
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data.posts;
};

export const fetchPopularTags = async (): Promise<Tag[]> => {
  const response = await fetch(`http://localhost:3000/api/v1/tags/popular`);
  if (!response.ok) {
    throw new Error("Failed to fetch popular tags");
  }
  const data = await response.json();
  return data;
};

export const fetchPostById = async (id: string): Promise<PostDetail> => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  const data = await response.json();
  return data;
};