import { User } from "../../models/User"

interface UserStore {
  insert(user: User): void;
  retrieve(): User | null;
  delete(): void;
}

export class UserLocalStore implements UserStore {
  static localStorageKey = "user"

  insert(user: User) {
    const userStringified = JSON.stringify(user)
    localStorage.setItem(UserLocalStore.localStorageKey, userStringified)
  }

  retrieve(): User | null {
    const string = localStorage.getItem(UserLocalStore.localStorageKey)
    const user = JSON.parse(string as string)

    if (user) return { ...user, updatedAt: new Date(user.updatedAt) }

    return null
  }

  delete() {
    localStorage.removeItem(UserLocalStore.localStorageKey)
  }
}
