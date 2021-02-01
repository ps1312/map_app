import { InvalidDataError, NoConnectivityError } from "../../services/errors"
import { HTTPClient, HTTPClientResponse } from "../../services/http/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

class RemoteGetProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async load(userId: number): Promise<void> {
    const userURL = new URL(`${userId}`, this.url)
    const result = await this.client.get(userURL)

    if (result instanceof HTTPClientResponse) {
      throw new InvalidDataError()
    }

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

    client.completeWith(new Error())
    const promise = sut.load(anyUserId())

    await expect(promise).rejects.toEqual(new NoConnectivityError())
  })

  test("delivers invalid data error on non 200 status code", async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(199, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(201, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(300, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())
  })

  test('delivers invalid data error on 200 status code but no valid JSON body', async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(200, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())
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
