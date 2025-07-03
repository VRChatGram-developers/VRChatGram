import prisma from "@/prisma/client";

export class UserRepository {

  async getUserByUid(uid: string) {
    const user = await prisma.users.findUnique({ where: { uid } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}