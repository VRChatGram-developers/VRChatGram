export type Post = {
  id: bigint | string;
  title: string;
  is_sensitive: boolean;
  images: Image[];
  is_liked: boolean;
  user: User;
};

export type PostList = {
  totalPages: number;
  currentPage: number;
  posts: Post[];
  postCount: number;
};

export type UserOtherPost = {
  id: bigint;
  title: string;
  images: Image[];
  user: User;
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
  isLiked: boolean;
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
  url: string;
};

export type User = {
  id: bigint;
  name: string;
  profile_url?: string;
  my_id: string;
  social_links: SocialLink[];
};

export type SocialLink = {
  platform_types: string;
  platform_url: string;
};

export type Tag = {
  tag: {
    id: string;
    name: string;
  };
};

export type ImageData = {
  file: File;
  file_data: string;
  file_name: string;
  width: number;
  height: number;
};
