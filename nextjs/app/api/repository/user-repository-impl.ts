import prisma from "@/prisma/client";
import { User, UserRepository } from "./user-repository";

export class UserRepositoryImpl implements UserRepository {
  async getUserByUid(uid: string): Promise<User> {
    const user = await prisma.users.findUnique({ where: { uid } });
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user.id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      profile_url: user.profile_url ?? "",
      my_id: user.my_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };
  }
}
