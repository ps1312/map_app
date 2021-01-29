import { UserRegisterModel } from "../RegisterFeature/UserRegister";

interface HTTPClient<T> {
  get(url: URL, params: T): void;
}

class RemoteUserRegister {
  constructor(private readonly client: HTTPClient<UserRegisterModel>) {}

  register(url: URL, params: UserRegisterModel): void {
    this.client.get(url, params)
  }
}

describe('RemoteUserRegister', () => {
  test('init does not request data from url', () => {
    const client = new HTTPClientSpy()
    new RemoteUserRegister(client)

    expect(client.requests).toEqual([])
  });

  test('register requests data from url with correct params', () => {
    const url = new URL("http://any-url.com")
    const client = new HTTPClientSpy()
    const sut = new RemoteUserRegister(client)
  
    const params: UserRegisterModel = {
      username: 'any-username',
      email: 'any-email@mail.com',
      password: 'any-password',
      passwordConfirmation: 'any-password',
    }

    sut.register(url, params)

    expect(client.requests[0]).toEqual({ url, params})
  });

  class HTTPClientSpy implements HTTPClient<UserRegisterModel> {
    requests: { url: URL, params: UserRegisterModel }[] = []

    get(url: URL, params: UserRegisterModel): void {
      this.requests.push({ url, params })
    }
  }
})
