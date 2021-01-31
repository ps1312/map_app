import { HTTPClient } from "../../RegisterAPI/HTTPClient"
import { UserRegisterModel } from "../../RegisterFeature/UserRegister"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

class RemoteUserLogin {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async login(credentials: UserRegisterModel): Promise<void> {
    await this.client.post(this.url, credentials)
  }
}

describe('RemoteUserLogin', () => {
  test('init does not make requests', () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test('login requests data from url with correct params', async () => {
    const url = new URL("http://another-url.com")
    const [sut, client] = makeSUT(url)
    const params = anyUserLoginModel()

    await sut.login(params)

    expect(client.requests[0]).toEqual({ url, params })
  })

  function makeSUT(url: URL = anyURL()): [RemoteUserLogin, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteUserLogin(url, client)

    return [sut, client]
  }

  function anyUserLoginModel() {
    return { email: "eve.holt@reqres.in", password: "cityslicka" }
  }
})

export {}