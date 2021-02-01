import { InvalidDataError, NoConnectivityError } from "../errors"
import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient"

export class RemoteEditUserProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async update(userId: number, updatedUser: UserEditModel): Promise<void> {
    const userURL = new URL(`${userId}`, this.url)
    const result = await this.client.put(userURL, updatedUser)

    if (result instanceof HTTPClientResponse) {
      throw new InvalidDataError()
    }

    throw new NoConnectivityError()
  }
}

export type UserEditModel = {
  email: string;
  first_name: string;
  last_name: string;
}