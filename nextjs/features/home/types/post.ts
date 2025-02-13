import { DateTime } from "next-auth/providers/kakao";

export type Post = {
  id: bigint;
  is_sensitive: boolean;
  images: PostImage[]; // Assuming `PostImage` is another type for `post_images`
  likes: Like[]; // Assuming `Like` is another type for `likes`
  is_posted_x?: boolean;
};

export type Posts = {
  posts: Post[];
};

// Assume other related types
type User = {
  id: bigint;
  post_id: bigint;
  user_id: bigint;
  posted_user_id: bigint;
  created_at: DateTime;
  updated_at: DateTime;
  post: Post;
  user: User;
  posted_user: User;
};

type PostImage = {
  id: bigint;
  post_id: bigint;
  url: string;
  created_at: string; // Date から string に変更
  updated_at: string; // Date から string に変更
  width?: string;
  height?: string;
  post: Post;
};

type Like = {
  id: bigint;
  post_id: bigint;
  user_id: bigint;
  posted_user_id: bigint;
  created_at: string; // Date から string に変更
  updated_at: string; // Date から string に変更
  post: Post;
  user: User;
};
