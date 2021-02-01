import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient";
import { InvalidDataError, NoConnectivityError } from "../errors";
import { UserLogin, UserLoginModel } from "../../models/UserLogin";
import { AuthenticationToken } from "../../models/AuthenticationToken";

export class RemoteUserLogin implements UserLogin {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async login(credentials: UserLoginModel): Promise<AuthenticationToken> {
    const response = await this.client.post(this.url, credentials)

    if (response instanceof HTTPClientResponse) {
      return RemoteUserLoginHandler.handle(response)
    }

    throw new NoConnectivityError();
  }
}

class RemoteUserLoginHandler {
  static handle(response: HTTPClientResponse): AuthenticationToken {
    const { statusCode, body } = response
    if (statusCode === 200 && hasValidResponseBody(body)) return body
    throw new InvalidDataError()
  }
}

type LoginResponseBody = {
  token: string;
}

function hasValidResponseBody(result: LoginResponseBody): result is LoginResponseBody {
  return (result as LoginResponseBody).token !== undefined;
}