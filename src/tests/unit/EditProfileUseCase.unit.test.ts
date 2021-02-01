import { InvalidDataError, NoConnectivityError } from "../../services/errors"
import { HTTPClient, HTTPClientResponse } from "../../services/http/HTTPClient"
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
    const result = await this.client.put(userURL, updatedUser)

    if (result instanceof HTTPClientResponse) {
      throw new InvalidDataError()
    }

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

  test("delivers invalid data error on non 200 status code", async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(199, {})
    await expect(sut.update(anyUserId(), anyUserEditModel())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(201, {})
    await expect(sut.update(anyUserId(), anyUserEditModel())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(300, {})
    await expect(sut.update(anyUserId(), anyUserEditModel())).rejects.toEqual(new InvalidDataError())
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
