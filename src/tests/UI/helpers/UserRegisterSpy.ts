import { AuthenticatedUser } from "../../../models/AuthenticatedUser"
import { UserRegister, UserRegisterModel } from "../../../models/UserRegister"

export class UserRegisterSpy implements UserRegister {
  lastUserRegisterModel?: UserRegisterModel

  async register(userRegisterModel: UserRegisterModel): Promise<AuthenticatedUser> {
    this.lastUserRegisterModel = userRegisterModel
    throw new Error()
  }
}
