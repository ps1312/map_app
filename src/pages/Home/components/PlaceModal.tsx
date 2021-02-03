import { Modal, ModalOverlay, ModalContent, Stack, Flex, Heading, Text } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

import { PlaceItemProps, renderBadge } from "./PlaceItem"

type PlaceInformationProps = {
  name: string;
  isFavourite: boolean;
  vicinity: string;
  business_status: string;
}

const PlaceInformation = (props: PlaceInformationProps) => (
  <>
    <Stack>
      <Flex justifyContent="space-between">
        <Heading size="lg">{props.name}</Heading>
        <StarIcon color={props.isFavourite ? "yellow.400" : "gray.400"} />
      </Flex>
      <Text>{props.vicinity}</Text>
    </Stack>
    <Flex justifyContent="space-between" mt="3">
      <div>
        {renderBadge(props.business_status)}
      </div>
      <Text
        color="blue.600"
        fontWeight="bold"
        alignSelf="flex-end"
      >
        Comments(0)
      </Text>
    </Flex>
  </>
)

type PlaceModalProps = {
  isOpen: boolean;
  onClose: (() => void)
  currentFavourite: PlaceItemProps;
}

const PlaceModal = ({ isOpen, onClose, currentFavourite }: PlaceModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent p={10}>
        <PlaceInformation
          name={currentFavourite.name}
          isFavourite={currentFavourite.isFavourite}
          vicinity={currentFavourite.vicinity}
          business_status={currentFavourite.business_status}
        />
        
      </ModalContent>
    </Modal>)
}

export default PlaceModal;