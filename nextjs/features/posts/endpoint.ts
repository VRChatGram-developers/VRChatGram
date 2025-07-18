import { Tag, PostDetail, PostList, PhotoType } from "./types/index";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPosts = async (params: string, headers?: Headers): Promise<PostList | string> => {
  const response = await fetch(`${API_URL}/api/v1/posts/search?${params}`, {
    headers: new Headers(headers),
  });

  if (!response.ok) {
    console.error(response);
    return "Failed to fetch posts";
  }

  return response.json();
};

export const fetchPostById = async (
  postId: string,
  headers?: Headers
): Promise<PostDetail | string> => {
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
          return { detail: description, name: name, image: images[0].original, url: link };
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

export const addViewCountToPost = async (postId: string) => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/views`, {
    method: "POST",
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

export const fetchPopularTagList = async (): Promise<Tag[] | string> => {
  const response = await fetch(`${API_URL}/api/v1/tags/popular?limit=20&isFeatchedPostImage=false`);
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch popular posts";
  }
  const data = await response.json();
  return data;
};

export const fetchS3SignedUrl = async ({
  fileName,
  contentType,
}: {
  fileName: string;
  contentType: string;
}): Promise<{ url: string } | string> => {
  const response = await fetch(`${API_URL}/api/v1/s3`, {
    method: "POST",
    body: JSON.stringify({ fileName, contentType }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch S3 signed url";
  }
  const data = await response.json();
  return data;
};

export const updatePost = async <T>(postId: string, post: T) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { boothItems, ...rest } = post;
  const boothItemsResponse = await Promise.all(
    boothItems.map(async (link: { id: string; url: string; title: string; detail: string }) => {
      if (link.url.includes("https://")) {
        const response = await fetch(`${API_URL}/api/v1/booth?url=${link.url}.json`);
        if (response.ok) {
          const data = await response.json();
          const { description, name, images } = await data;
          return {
            id: link.id,
            detail: description,
            name: name,
            image: images[0].original,
            url: link.url,
          };
        }
      }
    })
  );
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}`, {
    method: "PATCH",
    body: JSON.stringify({ ...rest, boothItems: boothItemsResponse }),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to update post";
  }
  const data = await response.json();
  return data;
};

export const fetchOtherPostList = async (postId: string, headers?: Headers) => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/other-post-list`, {
    headers: new Headers(headers),
  });

  if (!response.ok) {
    console.error(response);
    return "Failed to fetch other posts";
  }

  const data = await response.json();
  return data;
};

export const fetchRecommendPostList = async (postId: string, headers?: Headers) => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}/recommend-post-list`, {
    headers: new Headers(headers),
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch recommend posts";
  }
  const data = await response.json();
  return data;
};

export const deletePost = async (postId: string) => {
  const response = await fetch(`${API_URL}/api/v1/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error(response);
    return "Failed to delete post";
  }
  const data = await response.json();
  return data;
};

export const fetchPhotoTypes = async (): Promise<PhotoType[]> => {
  const response = await fetch(`${API_URL}/api/v1/posts/create`);
  if (!response.ok) {
    console.error(response);
  }
  const data = await response.json();
  return data;
};
