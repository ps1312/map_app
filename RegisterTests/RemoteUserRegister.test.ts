import { HTTPClient, HTTPClientResponse, HTTPClientResult } from "../RegisterAPI/HTTPClient";
import { RemoteUserRegister } from "../RegisterAPI/RemoteUserRegister";
import { NoConnectivityError, InvalidDataError } from "../RegisterAPI/SharedErrors";
import { AuthenticatedUser, UserRegisterModel } from "../RegisterFeature/UserRegister";

describe('RemoteUserRegister', () => {
  test('init does not request data from url', () => {
    const { client } = makeSUT()

    expect(client.requests).toEqual([])
  })

  test('register requests data from url with correct params', () => {
    const url = new URL("http://another-url.com")
    const { sut, client } = makeSUT(url)
    const params = anyUserRegisterModel()
  
    sut.register(params)

    expect(client.requests[0]).toEqual({ url, params })
  })

  test('register delivers no connectivity error on no internet connection', async () => {
    const { sut, client } = makeSUT()

    client.completeWith(new Error());
    const result = await sut.register(anyUserRegisterModel())

    expect(result).toStrictEqual(new NoConnectivityError());
  })

  test('register delivers invalid data error on non 200 status code', async () => {
    const { sut, client } = makeSUT()

    client.completeWithSuccess(199, "");
    expect(await sut.register(anyUserRegisterModel())).toStrictEqual(new InvalidDataError());

    client.completeWithSuccess(201, "");
    expect(await sut.register(anyUserRegisterModel())).toStrictEqual(new InvalidDataError());

    client.completeWithSuccess(300, "");
    expect(await sut.register(anyUserRegisterModel())).toStrictEqual(new InvalidDataError());
  })

  test('register delivers invalid data error on invalid response body', async () => {
    const { sut, client } = makeSUT()

    client.completeWithSuccess(200, "invalid response body")
    expect(await sut.register(anyUserRegisterModel())).toStrictEqual(new InvalidDataError());
  })

  test('register delivers user with access token on 200 status code and valid response data', async () => {
    const { sut, client } = makeSUT()
    let params = anyUserRegisterModel()

    let expectedResult: AuthenticatedUser = {
      user: { id: 4, email: params.email },
      token: "QpwL5tke4Pnpja7X4",
    }

    client.completeWithSuccess(200, "{\"id\":4,\"token\":\"QpwL5tke4Pnpja7X4\"}")
    expect(await sut.register(anyUserRegisterModel())).toStrictEqual(expectedResult);
  });

  type SutTypes = { sut: RemoteUserRegister, client: HTTPClientSpy }
  function makeSUT(url: URL = anyURL()): SutTypes {
    const client = new HTTPClientSpy()
    const sut = new RemoteUserRegister(url, client)

    return { sut, client }
  }

  function anyURL(): URL {
    return new URL("http://any-url.com");
  }

  function anyUserRegisterModel(): UserRegisterModel {
    return { email: 'any-email@mail.com', password: 'any-password' }
  }

  class HTTPClientSpy implements HTTPClient {
    requests: { url: URL, params: UserRegisterModel }[] = []
    response: HTTPClientResult

    async get(url: URL, params: UserRegisterModel): Promise<HTTPClientResult> {
      this.requests.push({ url, params })
      return this.response
    }

    completeWith(error: Error) {
      this.response = error
    }

    completeWithSuccess(statusCode: number, body: string) {
      this.response = new HTTPClientResponse(statusCode, body);
    }
  }
})
