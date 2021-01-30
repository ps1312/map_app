import 'whatwg-fetch'
import { HTTPClient, HTTPClientResponse, HTTPClientResult } from '../RegisterAPI/HTTPClient';
import { UserRegisterModel } from "../RegisterFeature/UserRegister";

export class FetchHTTPError implements Error {
  name: "Invalid error on fetch";
  message: "Fetch client couldn't complete with success";
}

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }

class FetchHTTPClient implements HTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async get(url: URL, params: Object): Promise<HTTPClientResult> {
    try {
      const result = await this.fetch(url.toString(), params)
      const responseBody = await result.json()
      return new HTTPClientResponse(result.status, responseBody)
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
    const sut = new FetchHTTPClient(fetchRejectStub)

    expect(await sut.get(anyURL(), anyUserRegisterModel())).toStrictEqual(new FetchHTTPError());
  });

  test('delivers invalid data error on invalid JSON body', async () => {
    const sut = new FetchHTTPClient(fetchInvalidBodyStub)

    expect(await sut.get(anyURL(), anyUserRegisterModel())).toStrictEqual(new FetchHTTPError());
  });

  test('delivers success response on 200 status code and valid json body', async () => {
    const expectedResult = new HTTPClientResponse(200, anyValidJSONBody())

    const sut = new FetchHTTPClient(fetchSuccessStub)
    const result = await sut.get(anyURL(), anyUserRegisterModel()) as HTTPClientResponse

    expect(result.statusCode).toStrictEqual(expectedResult.statusCode)
    expect(result.body).toStrictEqual(expectedResult.body)
  });

  function fetchRejectStub(): Promise<Response> {
    return new Promise((_, reject) => reject(new Error()))
  }

  function fetchInvalidBodyStub(): Promise<Response> {
    return new Promise((resolve, _reject) => resolve(new Response("invalid json")))
  }

  function fetchSuccessStub(): Promise<Response> {
    return new Promise((resolve, _reject) => resolve(anySuccessResponse(anyValidJSONBody())))
  }

  function anyValidJSONBody(): any {
    return { "any-key": "any-value" }
  }

  function anySuccessResponse(body: any): Response {
    return new Response(JSON.stringify(body), { status: 200 })
  }

  function anyURL(): URL {
    return new URL("http://any-url.com");
  }

  function anyUserRegisterModel(): UserRegisterModel {
    return { email: 'any-email@mail.com', password: 'any-password' }
  }
})
