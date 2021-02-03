import React, { useState } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { RegistrationForm } from "./components/RegistrationForm";
import { SubmitRegistrationButton } from "./components/SubmitRegistationButton";

const RegistrationPage = () => {
  const [isLoading] = useState(false);

  const [email, setEmail] = useState("");
  const handleEmailChange = (email: string) => setEmail(email);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (password: string) => setPassword(password);

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
        onSubmit={() => {}}
      />
    </Container>
  )
}

export default RegistrationPage;
