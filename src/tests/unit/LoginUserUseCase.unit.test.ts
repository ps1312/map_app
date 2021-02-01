import { RemoteUserLogin } from "../../services/login/RemoteUserLogin"
import { InvalidDataError, NoConnectivityError } from "../../services/errors"
import { AuthenticationToken } from "../../models/AuthenticationToken"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

describe('RemoteUserLogin', () => {
  test('init does not make requests', () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test('login requests data from url with correct params', async () => {
    const url = new URL("http://another-url.com")
    const [sut, client] = makeSUT(url)
    const loginModelParams = anyUserLoginModel()

    client.completeWithSuccess(200, anyLoginSuccessResult())
    await sut.login(loginModelParams)

    expect(client.requests[0].url.toString()).toStrictEqual(url.toString())
    expect(client.requests[0].params).toStrictEqual(loginModelParams)
  })

  test('login delivers connectivity error when client fails', async () => {
    const [sut, client] = makeSUT()
    const loginModelParams = anyUserLoginModel()

    client.completeWith(new Error())
    const promise = sut.login(loginModelParams)

    await expect(promise).rejects.toEqual(new NoConnectivityError())
  });

  test('login delivers invalid data error on non 200 status code', async () => {
    const [sut, client] = makeSUT()
    const loginModelParams = anyUserLoginModel()

    client.completeWithSuccess(199, {})
    await expect(sut.login(loginModelParams)).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(201, {})
    await expect(sut.login(loginModelParams)).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(300, {})
    await expect(sut.login(loginModelParams)).rejects.toEqual(new InvalidDataError())
  })

  test('login delivers invalid data error on 200 with invalid json', async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(200, "invalid json body")
    await expect(sut.login(anyUserLoginModel())).rejects.toEqual(new InvalidDataError())
  })

  test('login delivers logged in user with access token on 200 status code and valid json body', async () => {
    const [sut, client] = makeSUT()

    const expectedResult = anyLoginSuccessResult()

    client.completeWithSuccess(200, expectedResult)
    const result = await sut.login(anyUserLoginModel())

    expect(result.token).toStrictEqual(expectedResult.token)
  })

  function makeSUT(url: URL = anyURL()): [RemoteUserLogin, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteUserLogin(url, client)

    return [sut, client]
  }

  function anyUserLoginModel() {
    return { email: "eve.holt@reqres.in", password: "cityslicka" }
  }

  function anyLoginSuccessResult(): AuthenticationToken {
    return { token: "QpwL5tke4Pnpja7X4" }
  }
})