import { UserRegisterModel } from "../RegisterFeature/UserRegister";
import { HTTPClient, HTTPClientResponse } from "./HTTPClient";
import { InvalidDataError, NoConnectivityError } from "./SharedErrors";

export class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient<UserRegisterModel>,
    ) {}

  async register(params: UserRegisterModel): Promise<HTTPClientResponse> {
    const response: HTTPClientResponse = await this.client.get(this.url, params)

    if (response instanceof Error) {
      return new NoConnectivityError()
    }

    return new InvalidDataError();
  }
}