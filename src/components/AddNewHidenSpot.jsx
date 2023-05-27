/* eslint-disable no-undef */
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react'

const AddNewHidenSpot = () => {
    const [marker, setMarker] = useState(null)
    const [isAnyMarker, setIsAnyMarker] = useState(false)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const center = { lat: 13.795802, lng: -88.961608 };
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
        <h1>Create new hidden spot</h1>
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

export default AddNewHidenSpot