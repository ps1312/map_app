import React from "react";
import { Button } from "@chakra-ui/react"
import { RouteComponentProps } from "react-router-dom";

import { User } from "../models/User"
import { UserLocalStore } from "../services/cache/UserLocalStore"

const LoginPage = (props: RouteComponentProps) => {
  
  const login = () => {
    // await remote user login
    const userStore = new UserLocalStore()
    const user: User = { id: 4 }
    userStore.insert(user)
    props.history.replace("/")
  }

  return <Button colorScheme="blue" onClick={() => login()}>Login</Button>
}

export default LoginPage