/* eslint-disable no-undef */
import React, { useState,useMemo } from "react";

import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const Map = () => {
  const [hiddenSpotsMarkers, setHiddenSpotsMarkers] = useState();
  const [ActiveInfoWindow, setActiveInfoWindow] = useState()
  const [isData, setIsData] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const center = useMemo( () =>  ( { lat: 13.795802, lng: -88.961608 }),[]);  //const casa =   { lat : 13.670549, lng : -89.239163}

  const fetchingHiddenSpots = async () => {
    try {
      const hiddenSpots = await axios.get(
        process.env.REACT_APP_API_URL + "spots/hidden-spots"
      );
      console.log("Data", hiddenSpots.data);
      console.log("Lenght", hiddenSpots.data.length);
      if (hiddenSpots.data.length > 0) {
        console.log("Hay data!");
        setHiddenSpotsMarkers(hiddenSpots.data);
        setIsData(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handlerActiveInfoWindow = (marker) => {
    if(marker === ActiveInfoWindow){
      return
    }
    setActiveInfoWindow(marker)

  }

  if (!isLoaded) {
    fetchingHiddenSpots();
    return <div>Loading....</div>;
  }

  return (
    <>
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "1275px" }}
      >
        {console.log("MARKERS", hiddenSpotsMarkers)}
        {isData &&
          hiddenSpotsMarkers.map((e) => (
            <MarkerF
              key={e.id}
              title={e.name}
              position={{
                lng: e.location.coordinates[0],
                lat: e.location.coordinates[1],
              }}
              onClick={() => handlerActiveInfoWindow(e.id)}
            >
            {ActiveInfoWindow === e.id ? (
              <InfoWindowF onCloseClick={() => setActiveInfoWindow(null)}>
                <div>
                  <p2>{e.name}</p2>
                  <p>{e.description}</p>
                </div>
              </InfoWindowF>): null}
            </MarkerF>
          ))}
      </GoogleMap>
    </>
  );
};

export default Map;
