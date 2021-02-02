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

  test('retrieves last inserted user after insert twice', () => {
    const sut = new UserLocalStore(localStorage)

    sut.insert(anyUser())

    const latestUser = anyUser()
    sut.insert(latestUser)

    expect(sut.retrieve()).toStrictEqual(latestUser)
  })

  test('retrieves null after delete non empty store', () => {
    const sut = new UserLocalStore(localStorage)
    const latestUser = anyUser()

    sut.insert(latestUser)
    expect(sut.retrieve()).toStrictEqual(latestUser)

    sut.delete()
    expect(sut.retrieve()).toStrictEqual(null)
  })

  test('does not have side effects on deleting empty store', () => {
    const sut = new UserLocalStore(localStorage)

    sut.delete()
    expect(sut.retrieve()).toStrictEqual(null)

    sut.delete()
    expect(sut.retrieve()).toStrictEqual(null)
  })

  test('retrieve twice does not have side effects', () => {
    const sut = new UserLocalStore(localStorage)
    const latestUser = anyUser()

    sut.insert(latestUser)
    expect(sut.retrieve()).toStrictEqual(latestUser)
    expect(sut.retrieve()).toStrictEqual(latestUser)
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
