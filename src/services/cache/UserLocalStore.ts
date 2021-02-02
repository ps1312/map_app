import { User } from "../../models/User"

export class UserLocalStore {
  static localStorageKey = "user"

  constructor(private readonly store: Storage) {}

  insert(user: User) {
    const userStringified = JSON.stringify(user)
    this.store.setItem(UserLocalStore.localStorageKey, userStringified)
  }

  retrieve(): User | null {
    const string = this.store.getItem(UserLocalStore.localStorageKey)
    const user = JSON.parse(string as string)

    if (user) return { ...user, updatedAt: new Date(user.updatedAt) }

    return null
  }

  delete() {
    this.store.removeItem(UserLocalStore.localStorageKey)
  }
}
