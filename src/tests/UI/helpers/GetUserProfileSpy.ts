import { GetUserProfile } from "../../../models/GetUserProfile"
import { User } from "../../../models/User"

export class GetUserProfileSpy implements GetUserProfile {
  lastUserCalled?: User

  async find(email: string): Promise<User> {
    return this.lastUserCalled!
  }
}