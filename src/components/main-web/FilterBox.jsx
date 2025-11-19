import React from "react";
import Star_Svg from "../Svg_components/Star_Svg";

export default function FilterBox() {
  return (
    <div className="filter-box-main">
      <div className="heading">
        <h3>Filters</h3>
        <h3>Clear all</h3>
      </div>

      <div className="filter-items">
        <div className="filter-item">
          <h2>Rating</h2>
          {[4, 3, 2].map((star) => (
            <div className="option" key={star}>
              <input type="checkbox" />
              <label>
                <Star_Svg />
                {star}+ Stars
              </label>
            </div>
          ))}
        </div>

        <div className="filter-item">
          <h2>Apartments</h2>
          {[5, 10, 15, 20].map((apar) => (
            <div className="option" key={apar}>
              <input type="checkbox" />
              <label>{apar}+</label>
            </div>
          ))}
        </div>

        <div className="filter-item">
          <h2>Location</h2>
          <div className="option">
            <input type="text" placeholder="Please enter location" className="location-inp" />
            
          </div>

           
        </div>

        <div className="filter-item">
          <h2>Distance</h2>
          <div className="option">
            <input type="checkbox" />
            <label>Within 1 mile</label>
          </div>

          <div className="option">
            <input type="checkbox" />
            <label>Within 5 mile</label>
          </div>
          <div className="option">
            <input type="checkbox" />
            <label>Within 10 mile</label>
          </div>
          <div className="option">
            <input type="checkbox" />
            <label>Within 25 mile</label>
          </div>
        </div>
      </div>
    </div>
  );
}
