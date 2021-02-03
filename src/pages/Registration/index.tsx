import React, { useState } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { RegistrationForm } from "./components/RegistrationForm";
import { SubmitRegistrationButton } from "./components/SubmitRegistationButton";
import { UserRegister, UserRegisterModel } from "../../models/UserRegister";

type RegistrationPageProps = {
  registration: UserRegister
}

const RegistrationPage = ({ registration }: RegistrationPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const handleEmailChange = (email: string) => setEmail(email);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (password: string) => setPassword(password);

  const register = async () => {
    setIsLoading(true)
    try {
      const userRegisterModel: UserRegisterModel = { email, password }
      await registration.register(userRegisterModel)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container bg={'#' + ((Math.random() * 0xffffff) << 0).toString(16)} border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="120" display="flex" flexDirection="column">
      <Heading alignSelf="center" size="2xl" mb="10">Map App</Heading>

      <RegistrationForm
        email={email}
        onEmailChange={handleEmailChange}
        password={password}
        onPasswordChange={handlePasswordChange}
      />

      <SubmitRegistrationButton
        isLoading={isLoading}
        onSubmit={register}
      />
    </Container>
  )
}

export default RegistrationPage;
