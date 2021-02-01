import { FetchHTTPClient, FetchHTTPError } from '../../services/http/FetchHTTPClient';
import { HTTPClientResponse } from '../../services/http/HTTPClient';
import { anyURL, anyUserRegisterModel, anyValidJSONBody } from './Helpers/SharedHelpers';

describe('FetchHTTPClient', () => {
  test('init does not send requests', () => {
    const fetchSpy = jest.fn()
    new FetchHTTPClient(fetchSpy)

    expect(fetchSpy).not.toHaveBeenCalled()
  });

  test('get calls fetch with correct url and params', async () => {
    const url = anyURL()

    const expectedParams: RequestInit = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
    
    const fetchSpy = jest.fn()
    const sut = new FetchHTTPClient(fetchSpy)

    await expect(sut.get(anyURL())).rejects.toEqual(new FetchHTTPError());
    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy).toHaveBeenCalledWith(url.toString(), expectedParams)
  });

  test('post calls fetch with correct url and params', async () => {
    const url = anyURL()
    const body = anyUserRegisterModel()

    const expectedParams: RequestInit = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body)
    }
    
    const fetchSpy = jest.fn()
    const sut = new FetchHTTPClient(fetchSpy)

    const promise = sut.post(url, body)

    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy).toHaveBeenCalledWith(url.toString(), expectedParams)
    await expect(promise).rejects.toEqual(new FetchHTTPError())
  });

  test('post delivers error on request failure', async () => {
    const sut = new FetchHTTPClient(fetchRejectStub)

    await expect(sut.post(anyURL(), anyUserRegisterModel())).rejects.toEqual(new FetchHTTPError());
  });

  test('post delivers invalid data error on invalid JSON body', async () => {
    const sut = new FetchHTTPClient(fetchInvalidBodyStub)

    await expect(sut.post(anyURL(), anyUserRegisterModel())).rejects.toEqual(new FetchHTTPError());
  });

  test('post delivers success response on 200 status code and valid json body', async () => {
    const expectedResult = new HTTPClientResponse(200, anyValidJSONBody())

    const sut = new FetchHTTPClient(fetchSuccessStub)
    const result = await sut.post(anyURL(), anyUserRegisterModel()) as HTTPClientResponse

    expect(result.statusCode).toStrictEqual(expectedResult.statusCode)
    expect(result.body).toStrictEqual(expectedResult.body)
  });

  test('get delivers error on request failure', async () => {
    const sut = new FetchHTTPClient(fetchRejectStub)

    await expect(sut.get(anyURL())).rejects.toEqual(new FetchHTTPError());
  });

  test('get delivers invalid data error on invalid JSON body', async () => {
    const sut = new FetchHTTPClient(fetchInvalidBodyStub)

    await expect(sut.get(anyURL())).rejects.toEqual(new FetchHTTPError());
  });

  test('get delivers success response on 200 status code and valid json body', async () => {
    const expectedResult = new HTTPClientResponse(200, anyValidJSONBody())

    const sut = new FetchHTTPClient(fetchSuccessStub)
    const result = await sut.get(anyURL()) as HTTPClientResponse

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

  function anySuccessResponse(body: any): Response {
    return new Response(JSON.stringify(body), { status: 200 })
  }
})
