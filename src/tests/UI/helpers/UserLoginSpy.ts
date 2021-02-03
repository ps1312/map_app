import { AuthenticationToken } from "../../../models/AuthenticationToken"
import { UserLogin, UserLoginModel } from "../../../models/UserLogin"

export class UserLoginSpy implements UserLogin {
  lastUserLoginModel?: UserLoginModel

  async login(userLoginModel: UserLoginModel): Promise<AuthenticationToken> {
    this.lastUserLoginModel = userLoginModel
    return { token: "any-token" }
  }
}