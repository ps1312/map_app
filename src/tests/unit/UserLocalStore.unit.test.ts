import { AuthenticatedUser } from "../../models/AuthenticatedUser"
import { User } from "../../models/User"
import { UserLocalStore } from "../../services/cache/UserLocalStore"

describe('UserLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('init does not have any side effect', () => {
    new UserLocalStore()
    expect(localStorage.length).toEqual(0)
  })

  test('delivers null result on empty local store', () => {
    const sut = new UserLocalStore()
    const result = sut.retrieve()
    expect(result).toStrictEqual(null)
  })

  test('retrieves last inserted user after insert twice', () => {
    const sut = new UserLocalStore()

    sut.insert(anyAuthenticatedUser())

    const latestUser = anyAuthenticatedUser()
    sut.insert(latestUser)

    expect(sut.retrieve()).toStrictEqual(latestUser)
  })

  test('retrieves null after delete non empty store', () => {
    const sut = new UserLocalStore()
    const latestUser = anyAuthenticatedUser()

    sut.insert(latestUser)
    expect(sut.retrieve()).toStrictEqual(latestUser)

    sut.delete()
    expect(sut.retrieve()).toStrictEqual(null)
  })

  test('does not have side effects on deleting empty store', () => {
    const sut = new UserLocalStore()

    sut.delete()
    expect(sut.retrieve()).toStrictEqual(null)

    sut.delete()
    expect(sut.retrieve()).toStrictEqual(null)
  })

  test('retrieve twice does not have side effects', () => {
    const sut = new UserLocalStore()
    const latestUser = anyAuthenticatedUser()

    sut.insert(latestUser)
    expect(sut.retrieve()).toStrictEqual(latestUser)
    expect(sut.retrieve()).toStrictEqual(latestUser)
  })

  function anyAuthenticatedUser(): AuthenticatedUser {
    return {
      user: {
        id: Math.random(),
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
        updatedAt: new Date()
      },
      token: "any-token"
    }
  }
})
