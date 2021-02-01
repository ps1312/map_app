import { GetUserProfile } from "../../models/GetUserProfile"
import { User } from "../../models/User"
import { InvalidDataError, NoConnectivityError } from "../errors"
import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient"

export class RemoteGetUserProfile implements GetUserProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async load(userId: number): Promise<User> {
    const userURL = new URL(`${userId}`, this.url)
    const response = await this.client.get(userURL)

    if (response instanceof HTTPClientResponse) {
      return RemoteGetUserProfileHandler.handle(response)
    }

    throw new NoConnectivityError()
  }
}

class RemoteGetUserProfileHandler {
  static handle(response: HTTPClientResponse) {
    const { statusCode, body } = response
    if (statusCode === 200 && hasValidResponseBody(body)) return body.data
    throw new InvalidDataError()
  }
}

type GetUserResponseBody = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
}

function hasValidResponseBody(response: GetUserResponseBody): response is GetUserResponseBody {
  return (response as GetUserResponseBody).data !== undefined;
}