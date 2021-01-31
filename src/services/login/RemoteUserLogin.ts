import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient";
import { InvalidDataError, NoConnectivityError } from "../errors";
import { UserLoginResult, UserLoginModel } from "../../models/UserLogin";

export class RemoteUserLogin {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async login(credentials: UserLoginModel): Promise<UserLoginResult> {
    const result = await this.client.post(this.url, credentials)

    if (result instanceof HTTPClientResponse) {
      return UserLoginMapper.map(result)
    }

    throw new NoConnectivityError();
  }
}

class UserLoginMapper {
  static map(result: HTTPClientResponse): UserLoginResult {
    const { statusCode, body } = result

    if (statusCode === 200 && isResult(body)) {
      return body
    }

    throw new InvalidDataError()
  }
}

type LoginResultBody = {
  token: string;
}

function isResult(result: LoginResultBody): result is LoginResultBody {
  return (result as LoginResultBody).token !== undefined;
}