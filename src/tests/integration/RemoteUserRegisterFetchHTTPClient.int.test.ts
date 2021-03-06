import { FetchHTTPClient } from "../../services/http/FetchHTTPClient"
import { RemoteUserRegister } from "../../services/register/RemoteUserRegister"
import { UserRegisterModel } from "../../models/UserRegister"
import { AuthenticatedUser } from "../../models/AuthenticatedUser"

describe('End to end API call to test RemoteUserRegister and FetchHTTPClient', () => {
  test('delivers correct fixed data on request to REQ|RES server on register', async () => {
    const client = new FetchHTTPClient(fetch)
    const sut = new RemoteUserRegister(expectedURL(), client)
    const registerModel = expectedUserRegisterModel()

    const result = await sut.register(registerModel) as AuthenticatedUser

    const expected = expectedResult(registerModel.email) as AuthenticatedUser

    expect(result.user.id).toStrictEqual(expected.user.id)
    expect(result.user.email).toStrictEqual(expected.user.email)
    expect(result.token).toStrictEqual(expected.token)
  })

  function expectedURL(): URL {
    return new URL("https://reqres.in/api/register")
  }

  function expectedUserRegisterModel(): UserRegisterModel {
    return { email: "eve.holt@reqres.in", password: "pistol" }
  }

  function expectedResult(email: string): AuthenticatedUser {
    return { user: { id: 4, email: email}, token: "QpwL5tke4Pnpja7X4" }
  }
})
