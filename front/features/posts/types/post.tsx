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
