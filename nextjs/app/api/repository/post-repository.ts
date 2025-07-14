export interface PostRepository {
  deletePostAndRelatedData(postId: string, userId: string): Promise<{ success: boolean }>;
}