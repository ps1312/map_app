import { AuthenticationToken } from "./AuthenticationToken";

export type UserLoginModel = {
  email: string;
  password: string;
}

export interface UserLogin {
  login(userLoginModel: UserLoginModel): Promise<AuthenticationToken>;
}