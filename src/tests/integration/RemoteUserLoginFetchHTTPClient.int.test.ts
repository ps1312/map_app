import { RemoteUserLogin } from "../../LoginAPI/RemoteUserLogin"
import { FetchHTTPClient } from "../../RegisterAPI/FetchHTTPClient"
import { UserRegisterModel, AuthenticationToken } from "../../RegisterFeature/UserRegister"

describe('End to end API call to test RemoteUserLogin and FetchHTTPClient', () => {
  test('delivers correct fixed data on request to REQ|RES server on login', async () => {
    const client = new FetchHTTPClient(fetch)
    const sut = new RemoteUserLogin(expectedURL(), client)
    const registerModel = expectedUserRegisterModel()

    const result = await sut.login(registerModel) as AuthenticationToken

    const expected = expectedResult(registerModel.email)

    expect(result.token).toStrictEqual(expected.token)
  })

  function expectedURL(): URL {
    return new URL("https://reqres.in/api/login")
  }

  function expectedUserRegisterModel(): UserRegisterModel {
    return { email: "eve.holt@reqres.in", password: "pistol" }
  }

  function expectedResult(email: string): AuthenticationToken {
    return { token: "QpwL5tke4Pnpja7X4" }
  }
})
