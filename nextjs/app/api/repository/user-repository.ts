
export interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  profile_url: string;
  my_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}


export interface UserRepository {
  getUserByUid(uid: string): Promise<User>;
}