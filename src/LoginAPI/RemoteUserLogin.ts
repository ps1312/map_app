import { HTTPClient, HTTPClientResponse } from "../RegisterAPI/HTTPClient";
import { InvalidDataError, NoConnectivityError } from "../RegisterAPI/SharedErrors";
import { UserLoginResult, UserRegisterModel } from "../RegisterFeature/UserRegister";

export class RemoteUserLogin {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async login(credentials: UserRegisterModel): Promise<UserLoginResult> {
    const result = await this.client.post(this.url, credentials)

    if (result instanceof HTTPClientResponse) {
      return UserLoginMapper.map(result)
    }

    return new NoConnectivityError();
  }
}

class UserLoginMapper {
  static map(result: HTTPClientResponse): UserLoginResult {
    const { statusCode, body } = result

    if (statusCode === 200 && isResult(body)) {
      return body
    }
    return new InvalidDataError()
  }
}

type ResultBody = {
  token: string;
}

function isResult(result: ResultBody): result is ResultBody {
  return (result as ResultBody).token !== undefined;
}