import { InvalidDataError, NoConnectivityError } from "../../services/errors"
import { RemoteGetUserProfile } from "../../services/profile/RemoteGetUserProfile"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"
import { anyURL } from "./Helpers/SharedHelpers"

describe('RemoteGetUserProfile', () => {
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

  function makeSUT(url: URL = anyURL()): [RemoteGetUserProfile, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteGetUserProfile(url, client)

    return [sut, client]
  }

  function anyUserId(): number {
    return 4
  }
})
