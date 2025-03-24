import { Tag, PostDetail, PostList } from "./types/index";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPosts = async (
  params: string,
  headers?: Headers
): Promise<PostList | string> => {
  const response = await fetch(`${API_URL}/api/v1/posts/search?${params}`, {
    headers: new Headers(headers),
  });

  if (!response.ok) {
    console.error(response);
    return "Failed to fetch posts";
  }

  return response.json();
};

export const fetchPopularTags = async (): Promise<Tag[] | string> => {
  const response = await fetch(`${API_URL}/api/v1/tags/popular`);
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch popular tags";
  }
  const data = await response.json();
  return data;
};

export const fetchPostById = async (postId: string, headers?: Headers): Promise<PostDetail | string> => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}`, {
    headers: new Headers(headers),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch post";
  }
  const data = await response.json();
  return data;
};

export const likePost = async (postId: string): Promise<string> => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/likes`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const unlikePost = async (postId: string) => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/likes`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const createPost = async <T>(post: T) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { boothItems, ...rest } = post;
  const boothItemsResponse = await Promise.all(
    boothItems.map(async (link: string) => {
      if (link.includes("https://")) {
        const response = await fetch(`${API_URL}/api/v1/booth?url=${link}.json`);
        if (response.ok) {
          const data = await response.json();
          const { description, name, images } = await data;
          return { detail: description, name: name, image: images[0].resized, url: link };
        }
      }
    })
  );

  const response = await fetch(`${API_URL}/api/v1/posts`, {
    method: "POST",
    body: JSON.stringify({ ...rest, boothItems: boothItemsResponse }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to create post";
  }
  const data = await response.json();
  return data;
};

export const addViewCountToPost = async (postId: string, headers?: Headers) => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/views`, {
    headers: new Headers(headers),
  });

  if (response.status === 401) {
    return "Unauthorized";
  }

  if (!response.ok) {
    console.error(response);
    return "Failed to add view count to post";
  }
  const data = await response.json();
  return data;
};

export const uploadImage = async (image: {
  file_data: string;
  file_name: string;
  width: number;
  height: number;
}) => {
  const response = await fetch(`${API_URL}/api/v1/images/upload`, {
    method: "POST",
    body: JSON.stringify({ image }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to upload images";
  }
  const data = await response.json();
  return data;
};
