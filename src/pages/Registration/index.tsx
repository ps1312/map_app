import React, { useState } from "react";
import { Heading, Container } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { RegistrationForm, RegistrationFormValues } from "./components/RegistrationForm";
import { UserRegister } from "../../models/UserRegister";
import { UserLocalStore } from "../../services/cache/UserLocalStore";

type RegistrationPageProps = {
  registration: UserRegister
  cache: UserLocalStore;
}

const RegistrationPage = ({ registration, cache }: RegistrationPageProps) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true)
    try {
      const user = await registration.register(values)
      setIsLoading(false)
      cache.insert(user)
      history.replace("/")
    } catch {
      setFailed(true)
      setIsLoading(false)
    }
  }

  return (
    <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="120" display="flex" flexDirection="column">
      <Heading alignSelf="center" size="lg" mb="10">Create your account</Heading>

      <RegistrationForm
        failed={failed}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />

    </Container>
  )
}

export default RegistrationPage;
