import { useState } from "react"
import { Modal, ModalOverlay, ModalContent, Stack, Flex, Heading, Text, Textarea, Divider, ModalBody, Button, Box } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

import { PlaceItemProps, renderBadge } from "./PlaceItem"
import Rating from "./RatingStar";
import { CacheComment } from "../../../services/cache/CommentsLocalStore";
import CommentsList from "./CommentsList";

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
  addComment: ((placeId: string, content: string, score: number) => void);
  comments: CacheComment[]
}

const PlaceModal = ({ isOpen, onClose, currentFavourite, addComment, comments }: PlaceModalProps) => {
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent p={10} >
        <ModalBody display="flex" flexDirection="column">
          <PlaceInformation
            name={currentFavourite.name}
            isFavourite={currentFavourite.isFavourite}
            vicinity={currentFavourite.vicinity}
            business_status={currentFavourite.business_status}
          />

          <Divider mt="5" mb="5" />

          <Textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type something nice about this place..."
          />

          <Flex flexDirection="row" justifyContent="space-between">
            <Box alignSelf="center">
              <Rating rating={rating} setRating={setRating} />
            </Box>

            <Button
              disabled={content === ""}
              alignSelf="center"
              mt={5}
              colorScheme="blue"
              onClick={() => addComment(currentFavourite.place_id, content, rating)}
            >
              Submit
            </Button>
          </Flex>

          <Divider mt="5" mb="5" />

          <CommentsList comments={comments} />
        </ModalBody>
      </ModalContent>
    </Modal>)
}

export default PlaceModal;