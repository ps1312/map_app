import { Badge, Box, Text, Heading, Stack, Flex, IconButton } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

export type PlaceItemProps = {
  name: string;
  vicinity: string;
  place_id: string;
  latitude: string;
  longitude: string;
  business_status: string;
  isFavourite: boolean;
  makeFavourite: ((placeId: string) => void)
  unfavourite: ((placeId: string) => void)
}

const OperationalBadge = () => {
  return (
    <Badge variant="solid" colorScheme="green">
      OPERACIONAL
    </Badge>
  )
}

const ClosedPermanentlyBadge = () => {
  return (
    <Badge variant="outline" colorScheme="red">
      FECHADO PERMANENTEMENTE
    </Badge>
  )
}

const ClosedTemporarilyBadge = () => {
  return (
    <Badge variant="outline" colorScheme="yellow">
      FECHADO PERMANENTEMENTE
    </Badge>
  )
}

const renderBadge = (business_status: string) => {
  switch (business_status) {
    case "OPERATIONAL":
      return <OperationalBadge />

    case "CLOSED_PERMANENTLY":
      return <ClosedPermanentlyBadge />
    
    case "CLOSED_TEMORARILY":
      return <ClosedTemporarilyBadge />
  }
}

const PlaceListItem = (props: PlaceItemProps) => {
  return (
    <Box borderRadius={5} marginBottom={3} color="black" p="4" border="1px solid" borderColor="gray.300">
      <Stack>
        <Flex justifyContent="space-between">
          <Heading size="lg">{props.name}</Heading>
          <IconButton
            onClick={() => props.isFavourite ? props.unfavourite(props.place_id) : props.makeFavourite(props.place_id)}
            variant="ghost"
            size="md"
            aria-label="button"
            alignSelf="center"
            icon={<StarIcon color={props.isFavourite ? "yellow.400" : "gray.400"} />}
          />
        </Flex>
        <Text>{props.vicinity}</Text>
      </Stack>
      {renderBadge(props.business_status)}
    </Box>
  )
}

export default PlaceListItem