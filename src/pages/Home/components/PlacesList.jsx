import { UnorderedList } from "@chakra-ui/react"
import PlaceItem from "./PlaceItem";

const PlacesList = (props) => {
  return (
    <UnorderedList width="60%">
      {props.places.map((place, index) => (
        <PlaceItem
          index={index}
          openComments={props.openComments}
          isFavourite={props.favourites.indexOf(place.place_id) > -1}
          makeFavourite={props.makeFavourite}
          unfavourite={props.unfavourite}
          key={place.place_id}
          name={place.name}
          vicinity={place.vicinity}
          place_id={place.place_id}
          business_status={place.business_status}
          latitude={place.geometry.location.lat()}
          longitude={place.geometry.location.lng()}
        />
      ))}
    </UnorderedList>
  )
}

export default PlacesList;