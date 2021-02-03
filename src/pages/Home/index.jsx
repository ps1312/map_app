import React, {  useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import { Box } from "@chakra-ui/react";

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
    <Box display="flex" justifyContent="center">
      <ul>
        {places.map((place, index) => {
          return (
            <div key={index}>
              <span>{place.name}</span>
              <span>{place.vicinity}</span>
              <span>{place.place_id}</span>
              <span>{place.geometry.location.lat()}</span>
              <span>{place.geometry.location.lng()}</span>
              <br />
            </div>
          )
        })}
      </ul>
      <div style={{ height: '40vh', width: '40vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY, libraries: ['places'] }}
          defaultCenter={[34.0522, -118.2437]}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
    </Box>
  )
}

export default HomePage;