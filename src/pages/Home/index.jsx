import React, {  useState } from "react";
import { Box, Spinner, useDisclosure } from "@chakra-ui/react"
import PlacesList from "./components/PlacesList.jsx";
import Map from "./components/Map.jsx";
import PlaceModal from "./components/PlaceModal";

const HomePage = (props) => {
  const { favouritesCache } = props

  const [currentFavourite, setCurrentFavourite] = useState(null)
  const [favourites, setFavourites] = useState(favouritesCache.retrieve())
  const [places, setPlaces] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleApiLoaded(map, maps) {
    var service = new maps.places.PlacesService(map);
    var request = {
      fields: ['geometry', 'name', 'vicinity', 'place_id', 'business_status'],
      location: {
        lat: -8.114559,
        lng: -34.901789
      },
      radius: 500
    };
  
    service.nearbySearch(request, function(results) {
      setPlaces(results)
    });
  }

  const makeFavourite = (placeId) => {
    favouritesCache.insert(placeId)
    updateFavourites()
  }

  const unfavourite = (placeId) => {
    favouritesCache.delete(placeId)
    updateFavourites()
  }

  const updateFavourites = () => {
    const updatedFavourites = favouritesCache.retrieve()
    setFavourites(updatedFavourites)
  }

  const openComments = (placeIndex) => {
    onOpen()
    const currentFavourite = {
      ...places[placeIndex],
      index: placeIndex,
      isFavourite: favourites.indexOf(places[placeIndex].place_id) > -1,
      openComments,
      makeFavourite,
      unfavourite
    }
    setCurrentFavourite(currentFavourite)
  }

  const closeComments = () => {
    onClose()
    setCurrentFavourite(null)
  }

  return (
    <Box height="90vh" paddingTop="10vh" width="50vw" display="flex" justifyContent="center">

      {currentFavourite && (
        <PlaceModal
          isOpen={isOpen}
          onClose={closeComments}
          currentFavourite={currentFavourite}
        />
      )}

      {places.length > 0 ? (
        <PlacesList
          openComments={openComments}
          places={places}
          makeFavourite={makeFavourite}
          unfavourite={unfavourite}
          favourites={favourites}
          />
      ) : (
        <Spinner
          alignSelf="center"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      <Map places={places} handleApiLoaded={handleApiLoaded} />

    </Box>
  )
}

export default HomePage;
