import { AuthenticatedUser } from "./AuthenticatedUser"

export type UserRegisterModel = {
  email: string;
  password: string;
}

export interface UserRegister {
  register(userRegisterModel: UserRegisterModel): Promise<AuthenticatedUser>;
}
