import { FetchHTTPClient } from "../../services/http/FetchHTTPClient"
import { RemoteEditUserProfile } from "../../services/profile/RemoteEditUserProfile"

describe('End to end API call to test RemoteEditUserProfile and FetchHTTPClient', () => {
  test('delivers correct fixed data on request to REQ|RES server on login', async () => {
    const client = new FetchHTTPClient(fetch)
    const sut = new RemoteEditUserProfile(expectedURL(), client)

    const updatedFields = {
      email: "another-email@mail.com",
      first_name: "updated first",
      last_name: "updated last",
    }

    const result = await sut.update(expectedUserId(), updatedFields)
    
    expect(result.email).toStrictEqual(updatedFields.email)
    expect(result.first_name).toStrictEqual(updatedFields.first_name)
    expect(result.last_name).toStrictEqual(updatedFields.last_name)
    expect(result.updatedAt).not.toBeNull()
  })

  function expectedURL(): URL {
    return new URL("https://reqres.in/api/users/");
  }

  function expectedUserId(): number {
    return 4
  }
})