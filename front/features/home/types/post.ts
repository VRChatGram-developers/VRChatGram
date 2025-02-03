export type Post = {
    id: bigint;
    user_id: bigint;
    title: string;
    view_count: number;
    description?: string;  // Optional (nullable in the Prisma model)
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;  // Optional, can be null
    is_sensitive: boolean;
  
    // Relations
    user: User;  // Assuming `User` is another type representing the `users` model
    images: PostImage[];  // Assuming `PostImage` is another type for `post_images`
    likes: Like[];  // Assuming `Like` is another type for `likes`
    tags: PostTag[];  // Assuming `PostTag` is another type for `post_tags`
    reports: Report[];  // Assuming `Report` is another type for `reports`
    views: View[];  // Assuming `View` is another type for `views`
    booth_items: PostBoothItem[];  // Assuming `PostBoothItem` is another type for `post_booth_items`
  };

  export type Posts = {
    posts: Post[];
  };
  
  // Assume other related types
  type User = {
    id: bigint;
    // other fields
  };
  
  type PostImage = {
    id: bigint;
    // other fields
  };
  
  type Like = {
    id: bigint;
    // other fields
  };
  
  type PostTag = {
    id: bigint;
    // other fields
  };
  
  type Report = {
    id: bigint;
    // other fields
  };
  
  type View = {
    id: bigint;
    // other fields
  };
  
  type PostBoothItem = {
    id: bigint;
    // other fields
  };
  