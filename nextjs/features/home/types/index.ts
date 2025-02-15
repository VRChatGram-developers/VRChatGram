export type LatestPost = {
  id: bigint;
  title: string;
  images: Image[];
  user: User;
};

export type PopularPost = {
  id: bigint;
  title: string;
  is_sensitive: boolean;
  images: Image[];
  user: User;
};

export type Image = {
  id: bigint;
  url: string;
};

export type User = {
  id: bigint;
  name: string;
  profile_url: string;
};

export type NotificationType = "release" | "bug" | "important";

export type Notification = {
  id: number;
  title: string;
  published_at: string;
  notification_type: NotificationType;
  content: string | null;
};

