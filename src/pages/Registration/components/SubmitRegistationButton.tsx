import { Button } from "@chakra-ui/react"

type SubmitRegistrationButtonProps = {
  isLoading: boolean;
  disabled: boolean;
  onSubmit: (() => void);
}

export const SubmitRegistrationButton = ({
  isLoading,
  disabled,
  onSubmit,
}: SubmitRegistrationButtonProps) => (
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
