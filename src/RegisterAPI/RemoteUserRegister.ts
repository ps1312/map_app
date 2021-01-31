import { UserRegisterResult, UserRegisterModel, UserRegister } from "../RegisterFeature/UserRegister";
import { HTTPClient, HTTPClientResponse } from "./HTTPClient";
import { InvalidDataError, NoConnectivityError } from "./SharedErrors";

export class RemoteUserRegister implements UserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async register(params: UserRegisterModel): Promise<UserRegisterResult> {
    const response = await this.client.post(this.url, params)

    if (response instanceof HTTPClientResponse) {
      return RemoteUserMapper.map(response, params.email)
    }

    return new NoConnectivityError()
  }
}

class RemoteUserMapper {
  static map(response: HTTPClientResponse, email: string): UserRegisterResult {
    const { statusCode, body } = response;

      if (statusCode !== 200 || !isResult(body)) {
        return new InvalidDataError();
      } else {
        return {
          user: { id: body.id, email: email }, 
          token: body.token
        }
      }
  }
}

type ResultBody = {
  id: number;
  token: string;
}

function isResult(result: ResultBody): result is ResultBody {
  return (result as ResultBody).id !== undefined;
}