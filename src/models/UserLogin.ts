import { AuthenticationToken } from "./AuthenticationToken";

export type UserLoginModel = {
  email: string;
  password: string;
}

export type UserLoginResult = AuthenticationToken | Error

export interface UserLogin {
  login(userLoginModel: UserLoginModel): Promise<UserLoginResult>;
}