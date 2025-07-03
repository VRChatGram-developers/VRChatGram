import { auth } from "@/libs/firebase/auth";
import PostRepository from "../repository/post-repository";
import { UserRepository } from "../repository/user-repository";
import { NextResponse } from "next/server";

export default class PostService {
  protected postRepository: PostRepository;
  protected userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  async deletePostAndRelatedData(id: string) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }
    const user = await this.userRepository.getUserByUid(session.user.uid);
    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    await this.postRepository.deletePostAndRelatedData(id, user.id);
    return { message: "投稿を削除しました" };
  }
}
