import React, { useState } from "react";
import Down_Svg from "../Svg_components/Down_Svg";
import Star_Svg from "../Svg_components/Star_Svg";

export default function SearchComponent() {
  const [search, setSearch] = useState("sans");
  return (
    <div className="search-area-main">
      <div className="search-area">
        <input
          value={search}
          type="text"
          placeholder="Buisness name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="text" placeholder="Current Location" />
        <div className="search-btns">
          <button>Change</button>
          <button>Search</button>
        </div>
      </div>
      <div className="search-desc">
        <h3>Showing results for "{search?.slice(0, 6)}" in Current Location</h3>
        <p>
          1,234 businesses found <span>Refine search</span>
        </p>
      </div>

      <div className="search-filter">
        <div className="item">
          Sort: Best Matched arrow <Down_Svg />
        </div>
        <div className="item">
          <Star_Svg />
          4+ Stars{" "}
        </div>
        <div className="item">$ </div>
        <div className="item">$$ </div>
        <div className="item">$$$ </div>
        <div className="item">Open Now </div>
        <div className="item">With Photos </div>
      </div>
    </div>
  );
}
