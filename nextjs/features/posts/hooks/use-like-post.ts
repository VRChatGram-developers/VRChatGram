import { likePost, unlikePost } from "../endpoint";

const useLikePost = () =>
  //   posts: T[],
  //   setPosts: React.Dispatch<React.SetStateAction<T[]>>,
  //   setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
  {
    const handleLike = async (postId: string) => {
      // setIsLiked(!isLiked);
      // setPosts(
      //   posts.map((post) => (post.id === postId ? { ...post, is_liked: !post.is_liked } : post))
      // );

      try {
        await likePost(postId);
      } catch (error) {
        console.error(error);
      }
    };

    const handleUnlike = async (postId: string) => {
      // setIsLiked(!isLiked);
      // setPosts(
      //   posts.map((post) => (post.id === postId ? { ...post, is_liked: !post.is_liked } : post))
      // );

      try {
        await unlikePost(postId);
      } catch (error) {
        console.error(error);
      }
    };

    const handleLikeOrUnlike = async (postId: string, isLiked: boolean) => {
      if (isLiked) {
        await handleUnlike(postId);
      } else {
        await handleLike(postId);
      }
    };

    return { handleLikeOrUnlike };
  };

export default useLikePost;
