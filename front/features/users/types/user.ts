// ユーザーとその関連情報の型定義
export type User = {
  id: bigint;
  name: string;
  introduce: string;
  totalLikes: number;
  totalViews: number;
  posts: Post[][];
  top4Posts: Post[];
};

// 投稿の型定義
export type Post = {
  id: bigint;
  title: string;
  is_sensitive: boolean;
  likesCount: number;
  images: Image[];
};

// 画像の型定義
export type Image = {
  id: bigint;
  url: string;
};
