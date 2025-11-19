import React from "react";
import map from "../../assets/Images/map.png";
import Sponser from "./Sponser";

export default function MapView() {
  return <div className="map-view">
    <img className="map" src={map} alt="" />
    <Sponser />
  </div>
}
