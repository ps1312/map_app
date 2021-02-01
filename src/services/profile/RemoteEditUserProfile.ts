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
    const response = await this.client.put(userURL, updatedUser)

    if (response instanceof HTTPClientResponse) {
      return RemoteUserEditHandler.handle(userId, response)
    }

    throw new NoConnectivityError()
  }

}

class RemoteUserEditHandler {
  static handle(userId: number, response: HTTPClientResponse): User {
    const { statusCode, body } = response
    if (statusCode === 200 && hasValidResponseBody(body)) return { id: userId, ...body }
    throw new InvalidDataError()
  }
}

type EditUserResponseBody = {
  email?: string;
  first_name?: string;
  last_name?: string;
  updatedAt: Date;
}

function hasValidResponseBody(response: EditUserResponseBody): response is EditUserResponseBody {
  return (response as EditUserResponseBody).updatedAt !== undefined;
}
