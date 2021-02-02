import { Button } from "@chakra-ui/react"

import { UserLocalStore } from "../services/cache/UserLocalStore"

const HomePage = () => {
  const logout = () => {
    const userStore = new UserLocalStore()
    userStore.delete()
  }

  return <Button colorScheme="blue" onClick={() => logout()}>Logout</Button>
}

export default HomePage