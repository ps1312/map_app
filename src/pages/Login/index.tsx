import React, { useState } from "react";
import { Heading, Container } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { UserLocalStore } from "../../services/cache/UserLocalStore";
import { UserLogin } from "../../models/UserLogin";
import { LoginForm, LoginFormValues } from "./components/LoginForm";

type LoginPageProps = {
  authentication: UserLogin
  cache: UserLocalStore;
}

const LoginPage = ({ authentication, cache }: LoginPageProps) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)
    try {
      const { token } = await authentication.login(values)
      setIsLoading(false)
      cache.insert({ user: { email: values.email,updatedAt: new Date() }, token })
      history.replace("/")
    } catch {
      setFailed(true)
      setIsLoading(false)
    }
  }

  return (
    <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="120" display="flex" flexDirection="column">
      <Heading alignSelf="center" size="3xl" mb="10">Map App</Heading>

      <LoginForm
        failed={failed}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />

    </Container>
  )
}

export default LoginPage;
