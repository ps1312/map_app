import { User } from "./User";

export interface GetUserProfile {
  find(email: string): Promise<User>
}