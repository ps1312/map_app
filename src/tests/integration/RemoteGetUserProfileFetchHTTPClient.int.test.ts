import { User } from "../../models/User"
import { FetchHTTPClient } from "../../services/http/FetchHTTPClient"
import { RemoteGetUserProfile } from "../../services/profile/RemoteGetUserProfile"

describe('End to end API call to test RemoteGetUserProfile and FetchHTTPClient', () => {
  test('delivers correct fixed data on request to REQ|RES server on login', async () => {
    const client = new FetchHTTPClient(fetch)
    const sut = new RemoteGetUserProfile(expectedURL(), client)

    const result = await sut.find(expectedUserEmail())
    
    expect(result).toStrictEqual(expectedUser())
  })

  function expectedURL(): URL {
    return new URL("https://reqres.in/api/users/");
  }

  function expectedUserEmail(): string {
    return "janet.weaver@reqres.in"
  }

  function expectedUser(): User {
    return {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg'
    }
  }
})
