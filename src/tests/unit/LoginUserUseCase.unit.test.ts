import { HTTPClient } from "../../RegisterAPI/HTTPClient"
import { HTTPClientSpy } from "./Helpers/HTTPClientSpy"

class RemoteUserLogin {
  constructor(private readonly client: HTTPClient) {}
}

describe('RemoteUserLogin', () => {
  test('init does not make requests', () => {
    const client = new HTTPClientSpy()
    new RemoteUserLogin(client)

    expect(client.requests).toStrictEqual([])
  })
})

export {}