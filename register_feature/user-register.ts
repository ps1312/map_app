type UserRegisterModel = {}

type User = {}
type AuthenticationToken = {}

type AuthenticatedUser = {
  user: User;
  token: AuthenticationToken;
}

interface UserRegister {
  register(userRegisterModel: UserRegisterModel): AuthenticatedUser;
}