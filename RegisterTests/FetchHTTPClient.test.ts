import { HTTPClient, HTTPClientResult } from "../RegisterAPI/HTTPClient";

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }

class FetchHTTPClient implements HTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async get(url: URL, params: Object): Promise<HTTPClientResult> {
    return new Error()
  }
}

describe('FetchHTTPClient', () => {
  test('init does not send requests', () => {
    const fetchSpy = jest.fn()
    const sut = new FetchHTTPClient(fetchSpy)

    expect(fetchSpy).not.toHaveBeenCalled()
  });
})
