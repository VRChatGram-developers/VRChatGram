import { PhotoTypeRepository } from "../repository/photo-type-repository";
import { PhotoType } from "../repository/photo-type-repository";
import { PhotoTypeService } from "./photo-type-service";

export class PhotoTypeServiceImpl implements PhotoTypeService {
  private readonly photoTypeRepositoryImpl: PhotoTypeRepository;

  constructor(photoTypeRepository: PhotoTypeRepository) {
    this.photoTypeRepositoryImpl = photoTypeRepository;
  }

  async fetchPhotoTypes(): Promise<PhotoType[]> {
    try {
      return this.photoTypeRepositoryImpl.fetchPhotoTypes();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch photo types");
    }
  }
}