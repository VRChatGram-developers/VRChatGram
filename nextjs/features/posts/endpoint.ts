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

export const fetchPostById = async (postId: string): Promise<PostDetail> => {
  console.log(postId);
  const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  const data = await response.json();
  return data;
};

export const likePost = async (postId: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}/likes`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const unlikePost = async (postId: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}/likes`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};