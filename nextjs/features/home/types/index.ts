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
