import GoogleMapReact from 'google-map-react';
import { Box } from "@chakra-ui/react"

import Pin from './Pin';

const Map = (props) => {
  console.log(props.position)
  return (
    <Box bg="gray.100" borderRadius={2} overflow="hidden" right="5" bottom="1" width="50%" height="90%" position="fixed">
      {props.position &&
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY, libraries: ['places'] }}
          defaultCenter={[props.position.latitude, props.position.longitude]}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={props.onDragEnd}
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
      }
    </Box>
  )
}

export default Map;