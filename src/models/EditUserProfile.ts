import { User } from "./User";

export type UserEditModel = {
  email: string;
  first_name: string;
  last_name: string;
}

export interface EditUserProfile {
  update(userId: number, updatedUser: UserEditModel): Promise<User>;
}