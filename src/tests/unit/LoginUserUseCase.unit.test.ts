import { HTTPClient, HTTPClientResponse } from "../../RegisterAPI/HTTPClient"
import { InvalidDataError, NoConnectivityError } from "../../RegisterAPI/SharedErrors"
import { UserRegisterModel } from "../../RegisterFeature/UserRegister"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

class RemoteUserLogin {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async login(credentials: UserRegisterModel): Promise<Error> {
    const result = await this.client.post(this.url, credentials)

    if (result instanceof HTTPClientResponse) {
      return new InvalidDataError()
    }

    return new NoConnectivityError();
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

  test('login delivers connectivity error when client fails', async () => {
    const [sut, client] = makeSUT()
    const params = anyUserLoginModel()

    client.completeWith(new Error())
    const result = await sut.login(params)

    expect(result).toStrictEqual(new NoConnectivityError())
  });

  test('login delivers invalid data error on non 200 status code', async () => {
    const [sut, client] = makeSUT()
    const params = anyUserLoginModel()

    client.completeWithSuccess(199, {})
    expect(await sut.login(params)).toStrictEqual(new InvalidDataError())

    client.completeWithSuccess(201, {})
    expect(await sut.login(params)).toStrictEqual(new InvalidDataError())

    client.completeWithSuccess(300, {})
    expect(await sut.login(params)).toStrictEqual(new InvalidDataError())
  })

  test('login delivers invalid data error on 200 with invalid json', async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(200, "invalid json body")
    expect(await sut.login(anyUserLoginModel())).toStrictEqual(new InvalidDataError())
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