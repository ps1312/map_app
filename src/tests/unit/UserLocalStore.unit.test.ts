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

  test('retrieves last inserted user string after insert twice', () => {
    const sut = new UserLocalStore(localStorage)

    sut.insert(anyUser())

    const latestUser = anyUser()
    sut.insert(latestUser)

    expect(sut.retrieve()).toStrictEqual(JSON.stringify(latestUser))
  })

  function anyUser(): User {
    return {
      id: Math.random(),
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
      updatedAt: new Date()
    }
  }
})

export {}