import { Button } from "@chakra-ui/react"

type SubmitLoginButtonProps = {
  isLoading: boolean;
  disabled: boolean;
  onSubmit: (() => void);
}

export const SubmitLoginButton = ({
  isLoading,
  disabled,
  onSubmit,
}: SubmitLoginButtonProps) => (
  <Button
    mt={10}
    w="140px"
    disabled={disabled}
    colorScheme="blue"
    onClick={onSubmit}
    alignSelf="flex-end"
    isLoading={isLoading}
  >
      Login
  </Button>
)
