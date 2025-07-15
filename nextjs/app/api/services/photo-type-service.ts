import { PhotoType } from "../repository/photo-type-repository";

export interface PhotoTypeService {
  fetchPhotoTypes(): Promise<PhotoType[]>;
}
