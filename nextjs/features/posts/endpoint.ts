import { Tag, PostDetail } from "./types/index";

export const fetchPosts = async (params: string, headers: Headers) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/search?${params}`, {
    headers: headers
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
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

export const createPost = async <T>(post: T) => {

  // booth_itemsを取得
  const { boothItem, ...rest } = post as { boothItem: string[]; rest: any };

  const boothItemsResponse = await Promise.all(
    boothItem.map(async (link: string) => {
      if (link.includes("https://")) {
        const response = await fetch(`http://localhost:3000/api/v1/booth?url=${link}.json`);
        if (response.ok) {
        const data = await response.json();
        const { description, name, images } = await data;
        return { detail: description, name: name, image:images[0].resized, url: link };
      }
    }
  }));

  const response = await fetch(`http://localhost:3000/api/v1/posts`, {
    method: "POST",
    body: JSON.stringify({ ...rest, boothItems: boothItemsResponse }),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  const data = await response.json();
  return data;
};
