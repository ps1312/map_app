import { UserRegisterModel } from "../RegisterFeature/UserRegister";

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }

class FetchHTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async get(url: URL, params: Object): Promise<Error> {
    try {
      await this.fetch(url.toString(), params)
    } catch (error) {
      return new Error()
    }
  }
}

describe('FetchHTTPClient', () => {
  test('init does not send requests', () => {
    const fetchSpy = jest.fn()
    const sut = new FetchHTTPClient(fetchSpy)

    expect(fetchSpy).not.toHaveBeenCalled()
  });

  test('get calls fetch with correct url and params', async () => {
    const url = anyURL()
    const params = anyUserRegisterModel()
    const fetchSpy = jest.fn()
    const sut = new FetchHTTPClient(fetchSpy)

    await sut.get(url, params)

    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy).toHaveBeenCalledWith(url.toString(), params)
  });

  test('delivers error on request failure', async () => {
    const url = anyURL()
    const params = anyUserRegisterModel()
  
    const sut = new FetchHTTPClient(fetchReject)

    expect(await sut.get(url, params)).toStrictEqual(new Error());
  });

  function fetchReject(): Promise<Response> {
    return new Promise((_, reject) => reject(new Error()))
  }

  function anyURL(): URL {
    return new URL("http://any-url.com");
  }

  function anyUserRegisterModel(): UserRegisterModel {
    return { email: 'any-email@mail.com', password: 'any-password' }
  }
})
