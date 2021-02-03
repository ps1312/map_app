import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type RegistrationFormProps = {
  email: string;
  onEmailChange: ((email: string) => void);
  password: string;
  onPasswordChange: ((password: string) => void);
}

export const RegistrationForm = ({
  email,
  onEmailChange,
  password,
  onPasswordChange
} : RegistrationFormProps) => (
  <>
    <FormControl id="email" isRequired mt={5}>
      <FormLabel>Email address</FormLabel>
      <Input type="email" onChange={(e) => onEmailChange(e.target.value)} value={email}/>
    </FormControl>

    <FormControl id="password" isRequired mt={5}>
      <FormLabel>Password</FormLabel>
      <Input type="password" onChange={(e) => onPasswordChange(e.target.value)} value={password} />
    </FormControl>
  </>
)
