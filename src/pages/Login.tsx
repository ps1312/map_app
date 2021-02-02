import { Button } from "@chakra-ui/react"

import { User } from "../models/User"
import { UserLocalStore } from "../services/cache/UserLocalStore"

const LoginPage = () => {
  const login = () => {
    // await remote user login
    const userStore = new UserLocalStore()
    const user: User = { id: 4 }
    userStore.insert(user)
    // redirect
  }

  return <Button colorScheme="blue" onClick={() => login()}>Login</Button>
}

export default LoginPage