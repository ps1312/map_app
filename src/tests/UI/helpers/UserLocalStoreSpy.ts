import { AuthenticatedUser } from "../../../models/AuthenticatedUser";
import { UserStore } from "../../../services/cache/UserLocalStore";

export class UserLocalStoreSpy implements UserStore {
  insert(user: AuthenticatedUser): void {
  }

  retrieve(): AuthenticatedUser | null {
    return { user: { email: "any-email@mail.com" }, token: "any-token" }
  }

  delete(): void {
  }
}