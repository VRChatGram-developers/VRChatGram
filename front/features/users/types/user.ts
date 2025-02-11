export type User = {
  id: bigint;
  name: string;
  introduce: string;
  totalLikes: number;
  totalViews: number;
  posts: Post[][];
  top4Posts: Post[];
};

export type Post = {
  id: bigint;
  title: string;
  is_sensitive: boolean;
  likesCount: number;
  images: Image[];
};

export type Image = {
  id: bigint;
  url: string;
};
