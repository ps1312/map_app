import { HTTPClient, HTTPClientResponse, HTTPClientResult } from "./HTTPClient";

export class FetchHTTPError implements Error {
  name: "Invalid error on fetch";
  message: "Fetch client couldn't complete with success";
}

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }

export class FetchHTTPClient implements HTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async get(url: URL, params: Object): Promise<HTTPClientResult> {
    try {
      const result = await this.fetch(url.toString(), params)
      const responseBody = await result.json()
      return new HTTPClientResponse(result.status, responseBody)
    } catch (error) {
      return new FetchHTTPError()
    }
  }
}