import { RemoteUserRegister } from "../../services/register/RemoteUserRegister";
import { NoConnectivityError, InvalidDataError } from "../../services/errors";
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy";
import { anyUserRegisterModel, anyURL } from "./Helpers/SharedHelpers";

describe('RemoteUserRegister', () => {
  test('init does not request data from url', () => {
    const { client } = makeSUT()

    expect(client.requests).toEqual([])
  })

  test('register requests data from url with correct params', async () => {
    const url = new URL("http://another-url.com")
    const { sut, client } = makeSUT(url)
    const registerModelParams = anyUserRegisterModel()

    client.completeWithSuccess(200, { id: 4, token : "QpwL5tke4Pnpja7X4" })
    await sut.register(registerModelParams)

    expect(client.requests[0].url.toString()).toStrictEqual(url.toString())
    expect(client.requests[0].params).toStrictEqual(registerModelParams)
  })

  test('register delivers no connectivity error on no internet connection', async () => {
    const { sut, client } = makeSUT()

    client.completeWith(new Error());
    const result = sut.register(anyUserRegisterModel())

    await expect(result).rejects.toEqual(new NoConnectivityError());
  })

  test('register delivers invalid data error on non 200 status code', async () => {
    const { sut, client } = makeSUT()

    client.completeWithSuccess(199, "");
    await expect(sut.register(anyUserRegisterModel())).rejects.toEqual(new InvalidDataError());

    client.completeWithSuccess(201, "");
    await expect(sut.register(anyUserRegisterModel())).rejects.toEqual(new InvalidDataError());

    client.completeWithSuccess(300, "");
    await expect(sut.register(anyUserRegisterModel())).rejects.toEqual(new InvalidDataError());
  })

  test('register delivers invalid data error on invalid response body', async () => {
    const { sut, client } = makeSUT()

    client.completeWithSuccess(200, "invalid response body")
    await expect(sut.register(anyUserRegisterModel())).rejects.toEqual(new InvalidDataError());
  })

  test('register delivers user with access token on 200 status code and valid response data', async () => {
    const { sut, client } = makeSUT()
    const registerModelParams = anyUserRegisterModel()

    const expectedResult = {
      user: { id: 4, email: registerModelParams.email },
      token: "QpwL5tke4Pnpja7X4",
    }

    client.completeWithSuccess(200, { id: 4, token : "QpwL5tke4Pnpja7X4" })
    const result = await sut.register(anyUserRegisterModel())

    expect(result.user).toStrictEqual(expectedResult.user);
    expect(result.token).toStrictEqual(expectedResult.token);
  });

  type SutTypes = { sut: RemoteUserRegister, client: HTTPClientSpy }
  function makeSUT(url: URL = anyURL()): SutTypes {
    const client = new HTTPClientSpy()
    const sut = new RemoteUserRegister(url, client)

    return { sut, client }
  }
})
