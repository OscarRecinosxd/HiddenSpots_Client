import React from "react";
import HiddenSpotsMap from "../components/HiddenSpotsMap";
const Home = () => {
  const handleOpenEditSpotWindow = () => {

  }
  const handleOpenDeleteSpotWindow = () => {

  }
  return (
    <HiddenSpotsMap onDelete={handleOpenDeleteSpotWindow} onEdit={handleOpenEditSpotWindow}/>
  );
};
export default Home;
