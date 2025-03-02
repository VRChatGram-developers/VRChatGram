export type User = {
  id: bigint;
  name: string;
  introduce: string;
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
    id: bigint;
    title: string;
    show_sensitive_type: string;
    likesCount: number;
    images: Image[];
  };
  
  export type Image = {
    id: bigint;
    url: string;
  };
  
  export type requestCreateUser = {
    name: string;
    birthday: string;
    gender: string;
    email: string;
    password: string;
  };

  export type SocialLink = {
    platform_name: string;
    platform_url: string;
  };
