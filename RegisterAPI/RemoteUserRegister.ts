import { UserRegister, AuthenticatedUser, UserRegisterModel } from "../RegisterFeature/UserRegister";
import { HTTPClient, HTTPClientResponse } from "./HTTPClient";
import { InvalidDataError, NoConnectivityError } from "./SharedErrors";

export class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient<UserRegisterModel>,
    ) {}

  async register(params: UserRegisterModel): Promise<UserRegister.Result> {
    const response = await this.client.get(this.url, params)

    if (response instanceof HTTPClientResponse) {
      const { statusCode, body } = response;

      if (statusCode !== 200) {
        return new InvalidDataError();
      } else {
        try {
          let data = JSON.parse(body);
          let authenticatedUser: AuthenticatedUser = {
            user: { id: data['id'], email: params.email },
            token: data['token'],
          }
          return authenticatedUser
        } catch {
          return new InvalidDataError();
        }
      }
    }

    return new NoConnectivityError()
  }
}