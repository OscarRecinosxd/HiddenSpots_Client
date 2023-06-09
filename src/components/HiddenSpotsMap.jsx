/* eslint-disable no-undef */
import React, { useState, useMemo, useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import SpotPreview from "./emergentWindows/SpotPreview";
import { useLists } from "../contexts/ListsContext";

const HiddenSpotsMap = ({ onEdit, onDelete,filter,condition }) => {
  const { hiddenSpotsMarkers, getHiddenSpots } = useLists();
  const [ActiveInfoWindow, setActiveInfoWindow] = useState();
  const [selectedSpots,setSelectedSpots]=useState([])
  useEffect(() => {
    getHiddenSpots();
  }, []);
  useEffect(()=>{
    if(filter!=null){
      setSelectedSpots(hiddenSpotsMarkers.filter((hp=>(
        (hp.tourismcategoryId==filter)
      ))));
    }
  },[filter])
  useEffect(()=>{
    if(condition!=null){
      setSelectedSpots(hiddenSpotsMarkers.filter((hp=>(
        hp.phisicalconditiontypeId==condition
      ))));
    }
  },[condition])
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 13.795802, lng: -88.961608 }), []); //const casa =   { lat : 13.670549, lng : -89.239163}

  const handlerActiveInfoWindow = (marker) => {
    if (marker === ActiveInfoWindow) {
      return;
    }
    setActiveInfoWindow(marker);
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "1275px" }}
        >
          {(!filter & !condition)?
          hiddenSpotsMarkers?.length > 0 && hiddenSpotsMarkers?.map((e) => (
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
                  <SpotPreview spot={e} onEdit={onEdit} onDelete={onDelete} />
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))
          :
          selectedSpots?.length > 0 && selectedSpots?.map((e) => (
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
                  <SpotPreview spot={e} onEdit={onEdit} onDelete={onDelete} />
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))
          }
          
        </GoogleMap>
      ) : (
        <>
          {getHiddenSpots()}
          <div>Loading...</div>
        </>
      )}
    </>
  );
};

HiddenSpotsMap.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  filter:PropTypes.number,
  condition:PropTypes.number,
};

export default HiddenSpotsMap;
