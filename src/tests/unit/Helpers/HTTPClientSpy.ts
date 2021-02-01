import { HTTPClient, HTTPClientResult, HTTPClientResponse } from "../../../services/http/HTTPClient"
import { UserRegisterModel } from "../../../models/UserRegister"

export class HTTPClientSpy implements HTTPClient {
  requests: { url: URL, params: UserRegisterModel }[] = []
  response?: HTTPClientResult

  async post(url: URL, params: UserRegisterModel): Promise<HTTPClientResult> {
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