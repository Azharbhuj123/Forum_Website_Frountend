import React, { useState } from "react";
import { Plus_Svg } from "../../Svg_components/Svgs";
import Discussion from "../../Modals/Discussion";
import { FaPlus } from "react-icons/fa6";

export default function SectionOne() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="">
      <button className="back-button" onClick={() => window.history.back()}>
        <span className="back-arrow">‹</span> Back
      </button>

      <div className="discussion-head-main">
        <div className="heading">
          <h1>Community Discussions</h1>
          <p>Join the conversation and connect with the community</p>
        </div>
        <button onClick={() => setShowPopup(true)}>
         <FaPlus size={20}/>Start Discussion
        </button>
        <Discussion setIsOpen={setShowPopup} isOpen={showPopup} />
      </div>
    </div>
  );
}
