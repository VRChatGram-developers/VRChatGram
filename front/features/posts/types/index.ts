export type Post = {
  id: bigint;
  title: string;
  is_sensitive: boolean;
  images: Image[];
  totalPages: number;
  currentPage: number;
};

export type Image = {
  id: bigint;
  url: string;
};

export type PostDetail = {
  id: bigint;
  title: string;
  description: string;
  images: Image[];
  tags: Tag[];
  booths: Booth[];
  user: User;
  likeCount: number;
  viewCount: number;
};

export type Booth = {
  id: bigint;
  title: string;
  description: string;
  image: Image;
};

export type User = {
  id: bigint;
  name: string;
  profile_url: string;
  my_id: string;
};

export type Tag = {
  id: bigint;
  name: string;
};
