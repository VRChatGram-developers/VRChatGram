export type User = {
  id: string;
  name: string;
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
    id: bigint;
    title: string;
    show_sensitive_type: string;
    likesCount: number;
    images: Image[];
  };
  
  export type Image = {
    id: bigint;
    url: string;
    width: number;
    height: number;
  };
  
  export type requestCreateUser = {
    name: string;
    birthday: string;
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
    }
    header_image?: {
      file_data: string;
      file_name: string;
    }
    social_links: SocialLink[];
    name: string;
  };

  export type UserForHeader = {
    id: string;
    name: string;
    header_url: string;
  };
