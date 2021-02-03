import React, { useState } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { RegistrationForm, RegistrationFormValues } from "./components/RegistrationForm";
import { UserRegister, UserRegisterModel } from "../../models/UserRegister";

type RegistrationPageProps = {
  registration: UserRegister
}

const RegistrationPage = ({ registration }: RegistrationPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // const register = async () => {
  //   setIsLoading(true)
  //   try {
  //     const userRegisterModel: UserRegisterModel = { email, password }
  //     await registration.register(userRegisterModel)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const onSubmit = async (values: RegistrationFormValues) => {
    await registration.register(values)
  }

  return (
    <Container bg={'#' + ((Math.random() * 0xffffff) << 0).toString(16)} border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="120" display="flex" flexDirection="column">
      <Heading alignSelf="center" size="2xl" mb="10">Map App</Heading>

      <RegistrationForm
        isLoading={isLoading}
        onSubmit={onSubmit}
      />

    </Container>
  )
}

export default RegistrationPage;
