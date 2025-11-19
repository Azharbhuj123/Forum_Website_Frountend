import React from "react";
import sponser from "../../assets/Images/sponser.png";
import lock from "../../assets/Images/look.png";

export default function Sponser() {
  return (
    <div className="sponser">
      <p>SPONSORED</p>
      <div className="sponser-back">
        <img src={lock} alt="" />

        <h3>Your Add Here</h3>
        <p>Reach thousands of engaged users</p>
      </div>
    </div>
  );
}
