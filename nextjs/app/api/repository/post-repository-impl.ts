import prisma from "@/prisma/client";
import { PostRepository } from "./post-repository";

export class PostRepositoryImpl implements PostRepository {

  async deletePostAndRelatedData(postId: string, userId: string): Promise<{ success: boolean }> {
    const post = await prisma.posts.findUnique({ where: { id: postId } });
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.user_id !== userId) {
      throw new Error("User is not the owner of the post");
    }

    try {
      await prisma.$transaction(async (tx) => {
        await tx.post_tags.deleteMany({ where: { post_id: postId } });
        await tx.post_booth_items.deleteMany({ where: { post_id: postId } });
        await tx.likes.deleteMany({ where: { post_id: postId } });
        await tx.post_images.deleteMany({ where: { post_id: postId } });
        await tx.views.deleteMany({ where: { post_id: postId } });
        await tx.postPhotoTypes.deleteMany({ where: { post_id: postId } });
        await tx.posts.update({
          where: { id: postId, user_id: userId },
          data: { deleted_at: new Date() },
        });
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete post and related data");
    }
  }
}