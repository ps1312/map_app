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
      const { statusCode, body } = result

      if (statusCode === 200 && isResult(body)) {
        return { id: userId, ...body }
      }

      throw new InvalidDataError()
    }

    throw new NoConnectivityError()
  }
}

type EditUserResultBody = {
  email?: string;
  first_name?: string;
  last_name?: string;
  updatedAt: Date;
}

function isResult(result: EditUserResultBody): result is EditUserResultBody {
  return (result as EditUserResultBody).updatedAt !== undefined;
}
