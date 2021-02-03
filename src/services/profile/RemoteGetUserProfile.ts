import { GetUserProfile } from "../../models/GetUserProfile"
import { User } from "../../models/User"
import { InvalidDataError, NoConnectivityError } from "../errors"
import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient"

export class RemoteGetUserProfile implements GetUserProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async find(email: string): Promise<User> {
    const response = await this.client.get(this.url)

    if (response instanceof HTTPClientResponse) {
      return RemoteGetUserProfileHandler.handle(response, email)
    }

    throw new NoConnectivityError()
  }
}

class RemoteGetUserProfileHandler {
  static findInResponse(users: User[], email: string): User {
    const filteredUsers = users.filter((subject) => subject.email === email)
    if (users.length > 0) return filteredUsers[0]
    throw new InvalidDataError()
  }

  static handle(response: HTTPClientResponse, email: string) {
    const { statusCode, body } = response
    if (statusCode === 200 && hasValidResponseBody(body)) {
      return RemoteGetUserProfileHandler.findInResponse(body.data, email)
    }
    throw new InvalidDataError()
  }
}

type GetUserResponseBody = {
  data: User[]
}

function hasValidResponseBody(response: GetUserResponseBody): response is GetUserResponseBody {
  return (response as GetUserResponseBody).data !== undefined;
}