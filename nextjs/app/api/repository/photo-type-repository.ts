export type PhotoType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export interface PhotoTypeRepository {
  fetchPhotoTypes(): Promise<PhotoType[]>;
}
