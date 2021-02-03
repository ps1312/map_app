import { GetUserProfile } from "../../../models/GetUserProfile"
import { User } from "../../../models/User"

export class GetUserProfileSpy implements GetUserProfile {
  user?: User

  async find(): Promise<User> {
    return this.user!
  }
}