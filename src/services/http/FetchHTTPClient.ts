import { HTTPClient, HTTPClientResponse, HTTPClientResult } from "./HTTPClient";

export class FetchHTTPError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name =  "Invalid error on fetch";
    this.message = "Fetch client couldn't complete with success";
  }
}

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }

export class FetchHTTPClient implements HTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async post(url: URL, params: Object): Promise<HTTPClientResult> {
    try {
      const result = await this.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
      })

      const responseBody = await result.json()
      return new HTTPClientResponse(result.status, responseBody)
    } catch (error) {
      return new FetchHTTPError()
    }
  }
}