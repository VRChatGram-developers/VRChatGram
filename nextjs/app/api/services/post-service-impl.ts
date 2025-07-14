import { auth } from "@/libs/firebase/auth";
import { PostRepository } from "../repository/post-repository";
import { UserRepository } from "../repository/user-repository";
import { PostService } from "./post-service";

export class PostServiceImpl implements PostService {
  protected postRepositoryImpl: PostRepository;
  protected userRepository: UserRepository;

  constructor(
    postRepository: PostRepository,
    userRepository: UserRepository
  ) {
    this.postRepositoryImpl = postRepository;
    this.userRepository = userRepository;
  }

  async deletePostAndRelatedData(id: string): Promise<{ message: string }> {
    const session = await auth();
    if (!session) {
      throw new Error("ログインしてください");
    }
    const user = await this.userRepository.getUserByUid(session.user.uid);
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    await this.postRepositoryImpl.deletePostAndRelatedData(id, user.id);
    return { message: "投稿を削除しました" };
  }
}
