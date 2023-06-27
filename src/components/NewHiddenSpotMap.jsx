/* eslint-disable no-undef */
import React, { useState, useMemo } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const NewHiddenSpotMap = () => {
    const [marker, setMarker] = useState(null)
    const [isAnyMarker, setIsAnyMarker] = useState(false)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const center = useMemo( () =>  ( { lat: 13.795802, lng: -88.961608 }),[]);
    const { isLoaded } = useJsApiLoader({
      // eslint-disable-next-line no-undef
      googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });
    if (!isLoaded) {
      return <div>Loading....</div>;
    }
    const handleOnClick = (event) => {
        const newLat = event.latLng.lat()
        const newLng = event.latLng.lng()
        setMarker(<MarkerF position={{lng : newLng,lat :newLat }}/>)
        setLat(newLat)
        setLng(newLng)
        setIsAnyMarker(true)
        //PARA QUE NO DE ERROR EL ESLINT, AQUI SE GUARDAN LAS COORDENADAS
        console.log(lat,lng);
    };
    return (
      <>
        <GoogleMap
          onClick={handleOnClick}
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "500px" }}
        >
            {isAnyMarker && marker}
        </GoogleMap>
        

      </>
    );
}

export default NewHiddenSpotMap