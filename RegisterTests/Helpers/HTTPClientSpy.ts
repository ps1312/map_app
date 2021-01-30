import { HTTPClient, HTTPClientResult, HTTPClientResponse } from "../../RegisterAPI/HTTPClient"
import { UserRegisterModel } from "../../RegisterFeature/UserRegister"

export class HTTPClientSpy implements HTTPClient {
  requests: { url: URL, params: UserRegisterModel }[] = []
  response: HTTPClientResult

  async get(url: URL, params: UserRegisterModel): Promise<HTTPClientResult> {
    this.requests.push({ url, params })
    return this.response
  }

  completeWith(error: Error) {
    this.response = error
  }

  completeWithSuccess(statusCode: number, body: string) {
    this.response = new HTTPClientResponse(statusCode, body);
  }
}