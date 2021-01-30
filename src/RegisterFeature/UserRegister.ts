export type UserRegisterModel = {
  email: string;
  password: string;
}

export type User = {
  id: number,
  email: string,
}

export type AuthenticatedUser = {
  user: User;
  token: string;
}

export interface UserRegister {
  register(userRegisterModel: UserRegisterModel): AuthenticatedUser;
}

export type UserRegisterResult = AuthenticatedUser | Error