import { UserRegister, AuthenticatedUser, UserRegisterModel } from "../RegisterFeature/UserRegister";
import { HTTPClient, HTTPClientResponse } from "./HTTPClient";
import { InvalidDataError, NoConnectivityError } from "./SharedErrors";

export class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
    ) {}

  async register(params: UserRegisterModel): Promise<UserRegister.Result> {
    const response = await this.client.post(this.url, params)

    if (response instanceof HTTPClientResponse) {
      const { statusCode, body } = response;

      if (statusCode !== 200) {
        return new InvalidDataError();
      } else {
        if (isResult(body)) {
          const authenticatedUser: AuthenticatedUser = {
            user: { id: body.id, email: params.email },
            token: body.token,
          }
          return authenticatedUser
        } else {
          return new InvalidDataError();
        }
      }
    }

    return new NoConnectivityError()
  }
}

type ResultBody = {
  id: number;
  token: string;
}

function isResult(result: ResultBody): result is ResultBody {
  return (result as ResultBody).id !== undefined;
}