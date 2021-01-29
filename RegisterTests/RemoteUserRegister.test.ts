interface HTTPClient {
  get(url: URL): void;
}

class RemoteUserRegister {
  constructor(private readonly client: HTTPClient) {}

  register(url: URL): void {
    this.client.get(url)
  }
}

describe('RemoteUserRegister', () => {
  test('init does not request data from url', () => {
    const client = new HTTPClientSpy()
    new RemoteUserRegister(client)

    expect(client.requestedURLs).toEqual([])
  });

  test('register requests data from url', () => {
    const url = new URL("http://any-url.com")
    const client = new HTTPClientSpy()
    const sut = new RemoteUserRegister(client)

    sut.register(url)

    expect(client.requestedURLs).toEqual([url])
  });

  class HTTPClientSpy implements HTTPClient {
    requestedURLs: URL[] = []

    get(url: URL): void {
      this.requestedURLs.push(url)
    }
  }
})
