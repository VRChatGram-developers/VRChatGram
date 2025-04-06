export type User = {
  id: string;
  name: string;
  my_id: string;
  introduction_title: string;
  introduction_detail: string;
  profile_url?: string;
  header_url?: string;
  totalLikes: number;
  totalViews: number;
  posts: Post[][];
  top4Posts: Post[];
  isCurrentUser: boolean;
  social_links: SocialLink[];
};

export type Post = {
  id: string;
  title: string;
  show_sensitive_type: string;
  likesCount: number;
  images: Image[];
  isLiked: boolean;
  user: User;
};

export type Image = {
  id: bigint;
  url: string;
  width: number;
  height: number;
};

export type requestCreateUser = {
  name: string;
  my_id: string;
  birthday: {
    year: number;
    month: number;
    day: number;
  };
  gender: string;
  email: string;
  password: string;
};

export type SocialLink = {
  id: string;
  platform_types: string;
  platform_url: string;
};

export type requestUpdateUserProfile = {
  id: string;
  introduction_title: string;
  introduction_detail: string;
  profile_image?: {
    file_data: string;
    file_name: string;
  };
  header_image?: {
    file_data: string;
    file_name: string;
  };
  social_links: SocialLink[];
  name: string;
};

export type UserForHeader = {
  id: string;
  name: string;
  header_url: string;
  my_id: string;
};

export type ViewsPostList = {
  totalPages: number;
  currentPage: number;
  posts: Post[][];
  postCount: number;
};
