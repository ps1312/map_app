interface HTTPClient {}

class RemoteUserRegister {
  constructor(private readonly client: HTTPClient) {}

  register(url: URL): void {

  }
}

describe('RemoteUserRegister', () => {
  test("instantiation does make requests", () => {
    let client = new HTTPClientSpy()
    new RemoteUserRegister(client)

    expect(client.requestedURLs).toEqual([])
  });

  class HTTPClientSpy implements HTTPClient {
    requestedURLs: URL[] = []
  }
})
