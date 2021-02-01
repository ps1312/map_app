import { InvalidDataError, NoConnectivityError } from "../../services/errors"
import { HTTPClient, HTTPClientResponse } from "../../services/http/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

class RemoteGetProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async load(userId: number): Promise<User> {
    const userURL = new URL(`${userId}`, this.url)
    const result = await this.client.get(userURL)

    if (result instanceof HTTPClientResponse) {
      const { statusCode, body } = result

      if (statusCode === 200 && isResult(body)) {
        return body.data
      }
      throw new InvalidDataError()
    }

    throw new NoConnectivityError()
  }
}

type GetUserResultBody = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
}

function isResult(result: GetUserResultBody): result is GetUserResultBody {
  return (result as GetUserResultBody).data !== undefined;
}

describe('RemoteGetProfile', () => {
  test("does not make requests on init", () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test("pass correct url with query params to client on request", async () => {
    const url = anyURL()
    const userId = 4
    const [sut, client] = makeSUT(url)

    const promise = sut.load(userId)

    await expect(promise).rejects.toEqual(new NoConnectivityError())

    const expectedURL = new URL(`${userId}`, url)
    expect(client.requests[0].url).toStrictEqual(expectedURL)
  })

  test("delivers no connectivity error on client failure", async () => {
    const [sut, client] = makeSUT()

    client.completeWith(new Error())
    const promise = sut.load(anyUserId())

    await expect(promise).rejects.toEqual(new NoConnectivityError())
  })

  test("delivers invalid data error on non 200 status code", async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(199, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(201, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(300, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())
  })

  test('delivers invalid data error on 200 status code but no valid JSON body', async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(200, {})
    await expect(sut.load(anyUserId())).rejects.toEqual(new InvalidDataError())
  })

  test('delivers requested user data on 200 status code and valid JSON body', async () => {
    const [sut, client] = makeSUT()

    const validBody = {
      "data": {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://reqres.in/img/faces/2-image.jpg"
      },
    }

    client.completeWithSuccess(200, validBody)
    const result = await sut.load(anyUserId())
    
    expect(result).toStrictEqual(validBody['data'])
  })

  function makeSUT(url: URL = anyURL()): [RemoteGetProfile, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteGetProfile(url, client)

    return [sut, client]
  }

  function anyUserId(): number {
    return 4
  }
})
