import { AuthenticatedUser } from "../../models/AuthenticatedUser"

interface UserStore {
  insert(user: AuthenticatedUser): void;
  retrieve(): AuthenticatedUser | null;
  delete(): void;
}

export class UserLocalStore implements UserStore {
  static localStorageKey = "user"

  insert(user: AuthenticatedUser) {
    const userStringified = JSON.stringify(user)
    localStorage.setItem(UserLocalStore.localStorageKey, userStringified)
  }

  retrieve(): AuthenticatedUser | null {
    const string = localStorage.getItem(UserLocalStore.localStorageKey)
    const authenticatedUser = JSON.parse(string as string)

    if (authenticatedUser) {
      const tmpUser = {
        ...authenticatedUser.user,
        updatedAt: new Date(authenticatedUser.user.updatedAt)
      }

      return { user: {...tmpUser}, token: authenticatedUser.token }
    }

    return null
  }

  delete() {
    localStorage.removeItem(UserLocalStore.localStorageKey)
  }
}
