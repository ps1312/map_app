import { NoConnectivityError } from "../../services/errors"
import { HTTPClient, HTTPClientResult } from "../../services/http/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

class RemoteGetProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async load(userId: number): Promise<void> {
    const userURL = new URL(`${userId}`, this.url)
    await this.client.get(userURL)

    throw new NoConnectivityError()
  }
}

describe('RemoteGetProfile', () => {
  test("does not make requests on init", () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test("pass correct url with query params to client on request", async () => {
    const url = anyURL()
    const userId = 4
    const [sut, client] = makeSUT(url)

    const promise = sut.load(userId)

    await expect(promise).rejects.toEqual(new NoConnectivityError())

    const expectedURL = new URL(`${userId}`, url)
    expect(client.requests[0].url).toStrictEqual(expectedURL)
  })

  test("delivers no connectivity error on client failure", async () => {
    const [sut, client] = makeSUT()

    const promise = sut.load(anyUserId())

    client.completeWith(new Error())
    await expect(promise).rejects.toEqual(new NoConnectivityError())
  })

  function makeSUT(url: URL = anyURL()): [RemoteGetProfile, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteGetProfile(url, client)

    return [sut, client]
  }

  function anyUserId(): number {
    return 4
  }
})
