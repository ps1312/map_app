import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"

class RemoteEditUserProfile {}

describe('RemoteEditUserProfile', () => {
  test("init does not make request", () => {
    const client = new HTTPClientSpy()
    new RemoteEditUserProfile()

    expect(client.requests).toStrictEqual([])
  })
})
