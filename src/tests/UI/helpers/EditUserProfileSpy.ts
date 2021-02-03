import { EditUserProfile, UserEditModel } from "../../../models/EditUserProfile";
import { User } from "../../../models/User";

export class EditUserProfileSpy implements EditUserProfile {
  lastUpdatedUser?: User;

  async update(userId: number, updatedUser: UserEditModel): Promise<User> {
    throw new Error()
  }
}