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
      return RemoteUserRegisterHandler.handle(response, params.email)
    }

    throw new NoConnectivityError()
  }
}

class RemoteUserRegisterHandler {
  static makeAuthenticatedUser(email: string, body: RegisterResponseBody): AuthenticatedUser {
    return { user: { id: body.id, email: email }, token: body.token }
  }

  static handle(response: HTTPClientResponse, email: string): AuthenticatedUser {
    const { statusCode, body } = response;

      if (statusCode === 200 && hasValidResponseBody(body)) {
        return this.makeAuthenticatedUser(email, body)
      }

      throw new InvalidDataError();
  }
}

type RegisterResponseBody = {
  id: number;
  token: string;
}

function hasValidResponseBody(response: RegisterResponseBody): response is RegisterResponseBody {
  return (response as RegisterResponseBody).id !== undefined;
}