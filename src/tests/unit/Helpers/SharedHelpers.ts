import { UserRegisterModel } from "../../../models/UserAuthentication";

export function anyValidJSONBody(): any {
  return { "any-key": "any-value" }
}

export function anyURL(): URL {
  return new URL("http://any-url.com");
}

export function anyUserRegisterModel(): UserRegisterModel {
  return { email: 'any-email@mail.com', password: 'any-password' }
}