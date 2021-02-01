import { NoConnectivityError } from "../../services/errors"
import { HTTPClient } from "../../services/http/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL, anyUserId } from "./Helpers/SharedHelpers"

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

    throw new NoConnectivityError()
  }
}

describe('RemoteEditUserProfile', () => {
  test("init does not make request", () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test("delivers correct user edit params and URL to client", async () => {
    const url = new URL("http://diferent-url.com")
    const userId = 4
    const editedUserParams = anyUserEditModel()
    const [sut, client] = makeSUT(url)

    const promise = sut.update(userId, editedUserParams)

    const expectedURL = new URL(`${userId}`, url)

    await expect(promise).rejects.toEqual(new NoConnectivityError())
    expect(client.requests[0].url.toString()).toStrictEqual(expectedURL.toString())
    expect(client.requests[0].params).toStrictEqual(editedUserParams)
  })

  test("delivers no connectivity error on client failure", async () => {
    const [sut, client] = makeSUT()

    client.completeWith(new Error())
    const promise = sut.update(anyUserId(), anyUserEditModel())

    await expect(promise).rejects.toEqual(new NoConnectivityError())
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
