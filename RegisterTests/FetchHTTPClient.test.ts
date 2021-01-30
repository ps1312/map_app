import 'whatwg-fetch'
import { UserRegisterModel } from "../RegisterFeature/UserRegister";

export class FetchHTTPError implements Error {
  name: "Invalid error on fetch";
  message: "Fetch client couldn't complete with success";
}

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }

class FetchHTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async get(url: URL, params: Object): Promise<Error> {
    try {
      const response = await this.fetch(url.toString(), params)
      await response.json()
    } catch (error) {
      return new FetchHTTPError()
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

    expect(await sut.get(url, params)).toStrictEqual(new FetchHTTPError());
  });

  test('delivers invalid data error on invalid JSON body', async () => {
    const url = anyURL()
    const params = anyUserRegisterModel()
  
    const sut = new FetchHTTPClient(fetchInvalidBodyStub)

    expect(await sut.get(url, params)).toStrictEqual(new FetchHTTPError());
  });

  function fetchReject(): Promise<Response> {
    return new Promise((_, reject) => reject(new Error()))
  }

  function fetchInvalidBodyStub(): Promise<Response> {
    return new Promise((resolve, _reject) => resolve(new Response("invalid json")))
  }

  function anyURL(): URL {
    return new URL("http://any-url.com");
  }

  function anyUserRegisterModel(): UserRegisterModel {
    return { email: 'any-email@mail.com', password: 'any-password' }
  }
})
