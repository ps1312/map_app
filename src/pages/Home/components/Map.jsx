import GoogleMapReact from 'google-map-react';
import { Box } from "@chakra-ui/react"

import Pin from './Pin';

const Map = (props) => {
  return (
    <Box borderRadius={2} overflow="hidden" right="5" bottom="1" width="50%" height="90%" position="fixed">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY, libraries: ['places'] }}
        defaultCenter={[-8.114559, -34.901789]}
        defaultZoom={16}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => props.handleApiLoaded(map, maps)}
      >
        {props.places.map((place, index) => {
          return (
            <Pin
              key={index}
              lat={place.geometry.location.lat()}
              lng={place.geometry.location.lng()}
            />
          )
        })}
      </GoogleMapReact>
    </Box>
  )
}

export default Map;