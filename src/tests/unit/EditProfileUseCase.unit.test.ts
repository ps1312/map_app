import { HTTPClient } from "../../services/http/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

type UserEditModel = {
  email: string;
  first_name: string;
  last_name: string;
}

class RemoteEditUserProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async update(userId: number, updatedUser: UserEditModel): Promise<void> {
    const userURL = new URL(`${userId}`, this.url)
    await this.client.put(userURL, updatedUser)
  }
}

describe('RemoteEditUserProfile', () => {
  test("init does not make request", () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test("delivers correct user edit params and URL to client", () => {
    const url = new URL("http://diferent-url.com")
    const userId = 4
    const editedUserParams = anyUserEditModel()
    const [sut, client] = makeSUT(url)

    sut.update(userId, editedUserParams)

    const expectedURL = new URL(`${userId}`, url)

    expect(client.requests[0].url.toString()).toStrictEqual(expectedURL.toString())
    expect(client.requests[0].params).toStrictEqual(editedUserParams)
  })

  function makeSUT(url: URL = anyURL()): [RemoteEditUserProfile, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteEditUserProfile(url, client)

    return [sut, client]
  }

  function anyUserEditModel(): UserEditModel {
    return { email: "any-email@gmail.com", first_name: "any-first-name", last_name: "any-last-name" }
  }
})
