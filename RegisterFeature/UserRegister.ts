export type UserRegisterModel = {}

export type User = {}
export type AuthenticationToken = {}

export type AuthenticatedUser = {
  user: User;
  token: AuthenticationToken;
}

export interface UserRegister {
  register(userRegisterModel: UserRegisterModel): AuthenticatedUser;
}