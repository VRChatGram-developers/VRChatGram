import ReactPhotoAlbum from "@/components/react-photo-albums.tsx/react-photo-albums";
import { fetchPosts } from "@/features/posts/endpoint";

export default async function Home() {
  const posts = await fetchPosts("", new Headers());
  if (typeof posts === "string") {
    return <div>{posts}</div>;
  }
  return <ReactPhotoAlbum posts={posts.posts} />;
}
