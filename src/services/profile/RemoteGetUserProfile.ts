import { InvalidDataError, NoConnectivityError } from "../errors"
import { HTTPClient, HTTPClientResponse } from "../http/HTTPClient"

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export class RemoteGetUserProfile {
  constructor(
    private readonly url: URL,
    private readonly client: HTTPClient,
  ) {}

  async load(userId: number): Promise<User> {
    const userURL = new URL(`${userId}`, this.url)
    const result = await this.client.get(userURL)

    if (result instanceof HTTPClientResponse) {
      const { statusCode, body } = result

      if (statusCode === 200 && isResult(body)) {
        return body.data
      }
      throw new InvalidDataError()
    }

    throw new NoConnectivityError()
  }
}

type GetUserResultBody = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
}

function isResult(result: GetUserResultBody): result is GetUserResultBody {
  return (result as GetUserResultBody).data !== undefined;
}