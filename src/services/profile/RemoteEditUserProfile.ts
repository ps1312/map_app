import { EditUserProfile, UserEditModel } from "../../models/EditUserProfile"
import { User } from "../../models/User"
import { InvalidDataError, NoConnectivityError } from "../errors"
import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient"

export class RemoteEditUserProfile implements EditUserProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async update(userId: number, updatedUser: UserEditModel): Promise<User> {
    const userURL = new URL(`${userId}`, this.url)
    const result = await this.client.put(userURL, updatedUser)

    if (result instanceof HTTPClientResponse) {
      throw new InvalidDataError()
    }

    throw new NoConnectivityError()
  }
}
