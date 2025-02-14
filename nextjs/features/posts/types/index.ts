export type Post = {
  id: bigint;
  title: string;
  is_sensitive: boolean;
  images: Image[];
  totalPages: number;
  currentPage: number;
};

export type UserOtherPost = {
  id: bigint;
  title: string;
  images: Image[];
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
  booth_items: BoothItem[];
  user: User;
  likeCount: number;
  view_count: number;
  otherPostList: UserOtherPost[];
};

export type BoothItem = {
  id: bigint;
  booth: Booth;
  booth_id: bigint;
  post_id: bigint;
};

export type Booth = {
  id: bigint;
  title: string;
  detail: string;
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
