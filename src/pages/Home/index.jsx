import React, {  useRef, useState, useEffect } from "react";
import { Box, Spinner, useDisclosure } from "@chakra-ui/react"
import PlacesList from "./components/PlacesList.jsx";
import Map from "./components/Map.jsx";
import PlaceModal from "./components/PlaceModal";

const defaultLocation = { latitude: -8.114559, longitude: -34.901789 }

const HomePage = ({ favouritesCache, commentsCache, userCache }) => {
  const mapRef = useRef()
  const [currentFavourite, setCurrentFavourite] = useState(null)
  const [favourites, setFavourites] = useState(favouritesCache.retrieve())
  const [places, setPlaces] = useState([])
  const [comments, setComments] = useState([])
  const [position, setPosition] = useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setPosition(position.coords)
    }, () => {
      setPosition(defaultLocation)
    }, { timeout: 2000 });
  }, [])


  const handleApiLoaded = (map, maps) => {
    var service = new maps.places.PlacesService(map);
    mapRef.current = service
    updatePlaces(map)
  }

  const updatePlaces = (map) => {
    var request = {
      fields: ['geometry', 'name', 'vicinity', 'place_id', 'business_status'],
      location: map.center,
      radius: 500
    };
  
    mapRef.current.nearbySearch(request, function(results) {
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
    const placeId = places[placeIndex].place_id
    onOpen()
    const currentFavourite = {
      ...places[placeIndex],
      index: placeIndex,
      isFavourite: favourites.indexOf(placeId) > -1,
      openComments,
      makeFavourite,
      unfavourite
    }
    setCurrentFavourite(currentFavourite)
    setComments(commentsCache.retrieve(placeId))
  }

  const closeComments = () => {
    onClose()
    setCurrentFavourite(null)
    setComments([])
  }

  const addComment = (placeId, comment, score) => {
    const newComment = { content: comment, score, author: userCache.retrieve().user.email }
    commentsCache.insert(placeId, newComment)
    setComments(commentsCache.retrieve(placeId))
  }

  console.log(position)

  return (
    <Box height="90vh" paddingTop="10vh" width="50vw" display="flex" justifyContent="center">

      {currentFavourite && (
        <PlaceModal
          isOpen={isOpen}
          comments={comments}
          onClose={closeComments}
          addComment={addComment}
          currentFavourite={currentFavourite}
        />
      )}

      {places.length > 0 ? (
        <>
          <PlacesList
            openComments={openComments}
            places={places}
            makeFavourite={makeFavourite}
            unfavourite={unfavourite}
            favourites={favourites}
            />
        </>
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

      <Map
        position={position}
        places={places}
        handleApiLoaded={handleApiLoaded}
        onDragEnd={updatePlaces}
      />

    </Box>
  )
}

export default HomePage;
