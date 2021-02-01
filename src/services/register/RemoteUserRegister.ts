import { UserRegisterModel, UserRegister } from "../../models/UserRegister";
import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient";
import { InvalidDataError, NoConnectivityError } from "../errors";
import { AuthenticatedUser } from "../../models/AuthenticatedUser";

export class RemoteUserRegister implements UserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async register(params: UserRegisterModel): Promise<AuthenticatedUser> {
    const response = await this.client.post(this.url, params)

    if (response instanceof HTTPClientResponse) {
      return RemoteUserMapper.map(response, params.email)
    }

    throw new NoConnectivityError()
  }
}

class RemoteUserMapper {
  static map(response: HTTPClientResponse, email: string): AuthenticatedUser {
    const { statusCode, body } = response;

      if (statusCode !== 200 || !isResult(body)) {
        throw new InvalidDataError();
      } else {
        return {
          user: { id: body.id, email: email }, 
          token: body.token
        }
      }
  }
}

type RegisterResultBody = {
  id: number;
  token: string;
}

function isResult(result: RegisterResultBody): result is RegisterResultBody {
  return (result as RegisterResultBody).id !== undefined;
}