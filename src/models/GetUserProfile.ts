import { User } from "./User";

export interface GetUserProfile {
  load(userId: number): Promise<User>
}