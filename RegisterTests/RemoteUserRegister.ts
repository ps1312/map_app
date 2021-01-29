interface HTTPClient {}

class RemoteUserRegister {
  constructor(private readonly client: HTTPClient) {}

  register(url: URL): void {

  }
}

describe('RemoteUserRegister', () => {
  test('init does not request data from url', () => {
    let client = new HTTPClientSpy()
    new RemoteUserRegister(client)

    expect(client.requestedURLs).toEqual([])
  });

  test('load requests data from url', () => {

  });

  class HTTPClientSpy implements HTTPClient {
    requestedURLs: URL[] = []
  }
})
