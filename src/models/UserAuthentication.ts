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
  register(userRegisterModel: UserRegisterModel): Promise<UserRegisterResult>;
}

export type UserRegisterResult = AuthenticatedUser | Error


export type AuthenticationToken = {
  token: string
}

export type UserLoginResult = AuthenticationToken | Error