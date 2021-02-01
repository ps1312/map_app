import { HTTPClient } from "../../services/http/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

class RemoteGetProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  load(userId: number) {
    const userURL = new URL(`${userId}`, this.url)
    this.client.get(userURL)
  }
}

describe('RemoteGetProfile', () => {
  test("does not make requests on init", () => {
    const client = new HTTPClientSpy()
    new RemoteGetProfile(anyURL(), client)

    expect(client.requests).toStrictEqual([])
  })

  test("pass correct url with query params to client on request", () => {
    const url = anyURL()
    const userId = 4

    const client = new HTTPClientSpy()
    const sut = new RemoteGetProfile(url, client)

    sut.load(userId)

    const expectedURL = new URL(`${userId}`, url)
    expect(client.requests[0].url).toStrictEqual(expectedURL)
  })
})
