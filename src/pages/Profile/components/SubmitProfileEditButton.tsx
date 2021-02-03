import { Button } from "@chakra-ui/react"

type SubmitProfileEditButtonProps = {
  isLoading: boolean;
  disabled: boolean;
  onSubmit: (() => void);
}

export const SubmitProfileEditButton = ({
  isLoading,
  disabled,
  onSubmit,
}: SubmitProfileEditButtonProps) => (
  <Button
    mt={10}
    w="140px"
    disabled={disabled}
    colorScheme="blue"
    onClick={onSubmit}
    alignSelf="flex-end"
    isLoading={isLoading}
  >
      Edit profile
  </Button>
)
