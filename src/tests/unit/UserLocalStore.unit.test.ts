import { User } from "../../models/User"

class UserLocalStore {
  static localStorageKey = "user"

  constructor(
    private readonly store: Storage,
  ) {}

  insert(user: User) {
    const userStringified = JSON.stringify(user)
    this.store.setItem(UserLocalStore.localStorageKey, userStringified)
  }

  retrieve(): string | null {
    return this.store.getItem(UserLocalStore.localStorageKey)
  }
}

describe('UserLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('init does not have any side effect', () => {
    new UserLocalStore(localStorage)
    expect(localStorage.length).toEqual(0)
  })

  test('delivers null result on empty local store', () => {
    const sut = new UserLocalStore(localStorage)
    const result = sut.retrieve()
    expect(result).toStrictEqual(null)
  })

  test('retrieves newly inserted user string object on local store', () => {
    const subject = anyUser()
    const sut = new UserLocalStore(localStorage)
    sut.insert(subject)
    expect(sut.retrieve()).toStrictEqual(JSON.stringify(subject))
  })

  function anyUser(): User {
    return {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
      updatedAt: new Date()
    }
  }
})

export {}