export interface PostService {
  deletePostAndRelatedData(id: string): Promise<{ message: string }>;
}