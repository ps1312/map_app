import { UserRegisterModel } from "../RegisterFeature/UserRegister";

interface HTTPClient<T> {
  get(url: URL, params: T): Promise<Error>;
}

class NoConnectivityError implements Error {
  name: "No connectivity error";
  message: "Error trying to access to network";
}

class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient<UserRegisterModel>,
    ) {}

  async register(params: UserRegisterModel): Promise<Error> {
    await this.client.get(this.url, params)
    return new NoConnectivityError()
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
    response: Error

    async get(url: URL, params: UserRegisterModel): Promise<Error> {
      this.requests.push({ url, params })
      return this.response
    }

    completeWith(error: Error) {
      this.response = error
    }
  }
})
