import React, { useState } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { RegistrationForm, RegistrationFormValues } from "./components/RegistrationForm";
import { UserRegister } from "../../models/UserRegister";

type RegistrationPageProps = {
  registration: UserRegister
}

const RegistrationPage = ({ registration }: RegistrationPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true)
    try {
      await registration.register(values)
    } catch {
      setFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="120" display="flex" flexDirection="column">
      <Heading alignSelf="center" size="2xl" mb="10">Map App</Heading>

      <RegistrationForm
        failed={failed}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />

    </Container>
  )
}

export default RegistrationPage;
