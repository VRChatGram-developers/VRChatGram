export type LatestPost = {
  id: string;
  title: string;
  images: Image[];
  user: User;
  likes: Like[];
  is_liked: boolean;
};

export type PopularPost = {
  id: string;
  title: string;
  show_sensitive_type: string;
  images: Image[];
  user: User;
  likes: Like[];
  is_liked: boolean;
};

export type XPost = {
  id: string;
  title: string;
  images: Image[];
  user: User;
  likes: Like[];
  is_liked: boolean;
};

export type Image = {
  id: string;
  url: string;
};

export type User = {
  id: string;
  name: string;
  profile_url: string;
  my_id: string;
};

export type Like = {
  id: string;
  post_id: string;
  user_id: string;
  posted_user_id: string;
};

export type NotificationType = "release" | "bug" | "important";

export type Notification = {
  id: number;
  title: string;
  published_at: string;
  notification_type: NotificationType;
  content: string | null;
};

export type Tag = {
  id: bigint;
  name: string;
  top_post_image_url: string;
};

