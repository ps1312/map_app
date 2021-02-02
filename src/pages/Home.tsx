import { Button } from "@chakra-ui/react"
import { RouteComponentProps } from "react-router-dom";

import { UserLocalStore } from "../services/cache/UserLocalStore"

const HomePage = (props: RouteComponentProps) => {
  const userStore = new UserLocalStore()
  

  const logout = () => {
    const userStore = new UserLocalStore()
    userStore.delete()
    props.history.replace("/login")
  }

  return (
    <>
      <Button colorScheme="blue" onClick={() => logout()}>{userStore.retrieve()?.id}</Button>
      <Button colorScheme="blue" onClick={() => logout()}>{userStore.retrieve()?.id}</Button>
    </>
  )
}

export default HomePage