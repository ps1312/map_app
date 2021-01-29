import { UserRegisterModel } from "../RegisterFeature/UserRegister";
import { HTTPClient, HTTPClientResult, HTTPClientResponse } from "./HTTPClient";
import { InvalidDataError, NoConnectivityError } from "./SharedErrors";

export class RemoteUserRegister {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient<UserRegisterModel>,
    ) {}

  async register(params: UserRegisterModel): Promise<HTTPClientResult> {
    const response = await this.client.get(this.url, params)

    if (response instanceof HTTPClientResponse) {
      return new InvalidDataError();
    }

    return new NoConnectivityError()
  }
}