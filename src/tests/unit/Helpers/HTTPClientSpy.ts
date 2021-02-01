import { HTTPClient, HTTPClientResult, HTTPClientResponse } from "../../../services/http/HTTPClient"

export class HTTPClientSpy implements HTTPClient {
  requests: { url: URL, params?: Object }[] = []
  response?: HTTPClientResult

  async post(url: URL, params: Object): Promise<HTTPClientResult> {
    this.requests.push({ url, params })
    return this.response!
  }

  async get(url: URL): Promise<HTTPClientResult> {
    this.requests.push({ url })
    return this.response!
  }

  async put(url: URL, params: Object): Promise<HTTPClientResult> {
    this.requests.push({ url, params })
    return this.response!
  }

  completeWith(error: Error) {
    this.response = error
  }

  completeWithSuccess(statusCode: number, body: any) {
    this.response = new HTTPClientResponse(statusCode, body);
  }
}