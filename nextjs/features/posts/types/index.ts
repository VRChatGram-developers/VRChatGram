export type Post = {
  id: string;
  title: string;
  show_sensitive_type: string;
  images: Image[];
  is_liked: boolean;
  user: User;
};

export type PostList = {
  totalPages: number;
  currentPage: number;
  posts: Post[];
  postCount: number;
  postImageUrlWithMaxLikes: string;
};

export type UserOtherPost = {
  id: string;
  title: string;
  images: Image[];
  is_liked: boolean;
  user: User;
};

export type RecommendPost = {
  id: string;
  title: string;
  images: Image[];
  is_liked: boolean;
  user: User;
};

export type Image = {
  id: bigint;
  url: string;
  width: number;
  height: number;
};

export type PostDetail = {
  id: bigint;
  title: string;
  description: string;
  show_sensitive_type: string;
  images: Image[];
  tags: Tag[];
  booth_items: BoothItem[];
  user: User;
  likeCount: number;
  view_count: number;
  otherPostList: UserOtherPost[];
  recommendPostList: RecommendPost[];
  isLiked: boolean;
};

export type BoothItem = {
  id: bigint;
  booth: Booth;
  booth_id: bigint;
  post_id: bigint;
};

export type Booth = {
  id: string;
  title: string;
  detail: string;
  image: string;
  url: string;
};

export type BoothForUpdate = {
  id: string;
  title: string;
  detail: string;
  url: string;
};

export type User = {
  id: string;
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

export type ImageDataForUpdate = {
  id: string;
  file: File;
  file_data: string;
  file_name: string;
  width: number;
  height: number;
};
