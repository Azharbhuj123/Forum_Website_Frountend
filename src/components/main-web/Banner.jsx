import React from "react";
import nextIcon from "../Svg_components/next.svg";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className="main-banner">
      <div className="content">
        <h1>Discover & Share Reviews</h1>
        <p>
          Join our community of reviewers and discover the best businesses
          around you.
        </p>
      </div>
      <div className="content-btns">
        <button className="btn1" onClick={()=>navigate('/search-rental')}>
          Write a Review 
          <img src={nextIcon} alt="" />
        </button>
        <button className="btn2"  onClick={()=>navigate('/rental-detail')}>Explore Reviews</button>
      </div>
    </div>
  );
}

export default Banner;
