import React, {  useState } from "react";
import { Box, Spinner } from "@chakra-ui/react"
import PlacesList from "./components/PlacesList.jsx";
import Map from "./components/Map.jsx";

const HomePage = (props) => {
  const [places, setPlaces] = useState([])

  function handleApiLoaded(map, maps) {
    var service = new maps.places.PlacesService(map);
    var request = {
      location: {
        lat: -8.114559,
        lng: -34.901789
      },
      radius: 500
    };
  
    service.nearbySearch(request, function(results, status) {
      setPlaces(results)
    });
  }

  return (
    <Box height="90vh" paddingTop="10vh" width="50vw" display="flex" justifyContent="center">

      {places.length > 0 ? (
        <PlacesList places={places} />
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
