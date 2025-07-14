import { PhotoTypeRepository } from "./photo-type-repository";
import prisma from "@/prisma/client";
import { PhotoType } from "./photo-type-repository";

export class PhotoTypeRepositoryImpl implements PhotoTypeRepository {
  async fetchPhotoTypes(): Promise<PhotoType[]> {
    try {
      const photoTypes = await prisma.photoTypes.findMany();
      return photoTypes;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch photo types");
    }
  }
}