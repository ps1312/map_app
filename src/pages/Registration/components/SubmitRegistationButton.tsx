import { Button } from "@chakra-ui/react"

type SubmitRegistrationButtonProps = {
  isLoading: boolean;
  onSubmit: (() => void);
}

export const SubmitRegistrationButton = ({
  isLoading,
  onSubmit,
}: SubmitRegistrationButtonProps) => (
  <Button
    mt={10}
    w="140px"
    colorScheme="blue"
    onClick={onSubmit}
    alignSelf="flex-end"
    isLoading={isLoading}
  >
      Login
  </Button>
)
