import { GetUserProfile } from "../../../models/GetUserProfile"
import { User } from "../../../models/User"

export class GetUserProfileSpy implements GetUserProfile {
  error?: Error
  lastUserCalled?: User

  async find(email: string): Promise<User> {
    if (this.error) {
      throw new Error()
    }

    return this.lastUserCalled!
  }
}