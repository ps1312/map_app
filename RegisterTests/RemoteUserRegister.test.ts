import { UserRegisterModel } from "../RegisterFeature/UserRegister";

interface HTTPClient<T> {
  get(url: URL, params: T): void;
}

class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient<UserRegisterModel>,
    ) {}

  register(params: UserRegisterModel): void {
    this.client.get(this.url, params)
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

    get(url: URL, params: UserRegisterModel): void {
      this.requests.push({ url, params })
    }
  }
})
