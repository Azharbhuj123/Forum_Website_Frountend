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
          <div className="option">
            <input type="checkbox" />
            <label>
              <Star_Svg />
              4+ Stars
            </label>
          </div>
        </div>

        <div className="filter-item">
          <h2>Price</h2>
          <div className="option">
            <input type="checkbox" />
            <label>$</label>
          </div>

          <div className="option">
            <input type="checkbox" />
            <label>$$</label>
          </div>

          <div className="option">
            <input type="checkbox" />
            <label>$$$</label>
          </div>

          <div className="option">
            <input type="checkbox" />
            <label>$$$$</label>
          </div>
        </div>

        <div className="filter-item">
          <h2>Availability</h2>
          <div className="option">
            <input type="checkbox" />
            <label>Open Now</label>
          </div>

          <div className="option">
            <input type="checkbox" />
            <label>With Photos</label>
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
