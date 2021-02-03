import { InvalidDataError, NoConnectivityError } from "../../services/errors"
import { RemoteGetUserProfile } from "../../services/profile/RemoteGetUserProfile"
import { HTTPClientSpy } from "./helpers/HTTPClientSpy"
import { anyURL } from "./helpers/SharedHelpers"

describe('RemoteGetUserProfile', () => {
  test("does not make requests on init", () => {
    const [, client] = makeSUT()

    expect(client.requests).toStrictEqual([])
  })

  test("pass correct url to client on request", async () => {
    const url = anyURL()
    const userEmail = anyEmail()
    const [sut, client] = makeSUT(url)

    const promise = sut.find(userEmail)

    await expect(promise).rejects.toEqual(new NoConnectivityError())

    expect(client.requests[0].url.toString()).toStrictEqual(url.toString())
  })

  test("delivers no connectivity error on client failure", async () => {
    const [sut, client] = makeSUT()

    client.completeWith(new Error())
    const promise = sut.find(anyEmail())

    await expect(promise).rejects.toEqual(new NoConnectivityError())
  })

  test("delivers invalid data error on non 200 status code", async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(199, {})
    await expect(sut.find(anyEmail())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(201, {})
    await expect(sut.find(anyEmail())).rejects.toEqual(new InvalidDataError())

    client.completeWithSuccess(300, {})
    await expect(sut.find(anyEmail())).rejects.toEqual(new InvalidDataError())
  })

  test('delivers invalid data error on 200 status code but no valid JSON body', async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(200, {})
    await expect(sut.find(anyEmail())).rejects.toEqual(new InvalidDataError())
  })

  test('delivers invalid data if user is not found', async () => {
    const [sut, client] = makeSUT()

    client.completeWithSuccess(200, { "data": [] })
    await expect(sut.find(anyEmail())).rejects.toEqual(new InvalidDataError())
  })

  test('delivers requested user data on 200 status code and valid JSON body', async () => {
    const email = "george.bluth@reqres.in"
    const [sut, client] = makeSUT()

    const validResponseBody = {
      "data": [
        {
          "id": 1,
          "email": "george.bluth@reqres.in",
          "first_name": "George",
          "last_name": "Bluth",
          "avatar": "https://reqres.in/img/faces/1-image.jpg"
        },
        {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
      ]
    }

    client.completeWithSuccess(200, validResponseBody)
    const result = await sut.find(email)
    
    expect(result).toStrictEqual(validResponseBody['data'][0])
  })

  function makeSUT(url: URL = anyURL()): [RemoteGetUserProfile, HTTPClientSpy] {
    const client = new HTTPClientSpy()
    const sut = new RemoteGetUserProfile(url, client)

    return [sut, client]
  }

  function anyEmail(): string {
    return "eve.holt@reqres.in"
  }
})
