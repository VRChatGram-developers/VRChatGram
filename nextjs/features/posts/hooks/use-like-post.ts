import { likePost, unlikePost } from "../endpoint";

const useLikePost = () => {
  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async (postId: string) => {
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
