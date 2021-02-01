import { HTTPClient, HTTPClientResponse, HTTPClientResult } from "./HTTPClient";

export class FetchHTTPClient implements HTTPClient {
  fetch: FetchSignature

  constructor(fetch: FetchSignature) {
    this.fetch = fetch
  }

  async get(url: URL): Promise<HTTPClientResult> {
    return await this.makeRequest(url, { method: "GET" });
  }

  async post(url: URL, params: Object): Promise<HTTPClientResult> {
    const postParameters = { method: "POST", body: JSON.stringify(params) }
    return await this.makeRequest(url, postParameters);
  }

  put(url: URL, params: Object): Promise<HTTPClientResult> {
    throw new Error("Method not implemented.");
  }

  private async makeRequest(url: URL, params: Object) {
    try {
      const result = await this.fetch(url.toString(), {
        ...params,
        headers: { "Content-Type": "application/json" },
      })

      const responseBody = await result.json()
      return new HTTPClientResponse(result.status, responseBody)
    } catch (error) {
      throw new FetchHTTPError()
    }
  }
}

export class FetchHTTPError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name =  "Invalid error on fetch";
    this.message = "Fetch client couldn't complete with success";
  }
}

type FetchSignature = { (input: RequestInfo, init?: RequestInit): Promise<Response> }