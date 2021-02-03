import { EditUserProfile, UserEditModel } from "../../../models/EditUserProfile";
import { User } from "../../../models/User";

export class EditUserProfileSpy implements EditUserProfile {
  lastUpdatedUser?: User;

  async update(userId: number, updatedUser: UserEditModel): Promise<User> {
    this.lastUpdatedUser = updatedUser;

    return {
      id: userId,
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
    }
  }
}