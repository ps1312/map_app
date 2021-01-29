import { UserRegisterModel } from "../RegisterFeature/UserRegister";

type HTTPClientResponse = number | Error

interface HTTPClient<T> {
  get(url: URL, params: T): Promise<HTTPClientResponse>;
}

class NoConnectivityError implements Error {
  name: "No connectivity error";
  message: "Error trying to access to network";
}

class InvalidDataError implements Error {
  name: "Invalid data error";
  message: "Invalid data returned from HTTPClient";
}

class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient<UserRegisterModel>,
    ) {}

  async register(params: UserRegisterModel): Promise<HTTPClientResponse> {
    const response: HTTPClientResponse = await this.client.get(this.url, params)

    if (response instanceof Error) {
      return new NoConnectivityError()
    }

    return new InvalidDataError();
  }
}

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

    client.completeWithSuccess(300);
    const result = await sut.register(anyUserRegisterModel())

    expect(result).toStrictEqual(new InvalidDataError());
  })

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
    return { username: 'any-username', email: 'any-email@mail.com',
            password: 'any-password', passwordConfirmation: 'any-password' }
  }

  class HTTPClientSpy implements HTTPClient<UserRegisterModel> {
    requests: { url: URL, params: UserRegisterModel }[] = []
    response: HTTPClientResponse

    async get(url: URL, params: UserRegisterModel): Promise<HTTPClientResponse> {
      this.requests.push({ url, params })
      return this.response
    }

    completeWith(error: Error) {
      this.response = error
    }

    completeWithSuccess(statusCode: number) {
      this.response = statusCode
    }
  }
})
