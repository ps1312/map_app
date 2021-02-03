import { Badge, Box, Text, Heading, Stack } from "@chakra-ui/react"

export type PlaceItemProps = {
  name: string;
  vicinity: string;
  place_id: string;
  latitude: string;
  longitude: string;
  business_status: string;
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
        <Heading size="lg">{props.name}</Heading>
        <Text>{props.vicinity}</Text>
      </Stack>
      {renderBadge(props.business_status)}
    </Box>
  )
}

export default PlaceListItem