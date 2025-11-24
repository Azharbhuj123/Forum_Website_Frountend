import React, { useState } from "react";
import Down_Svg from "../Svg_components/Down_Svg";
import Star_Svg from "../Svg_components/Star_Svg";

export default function SearchComponent({ data, final_query, setFinalQuery }) {
  const [search, setSearch] = useState(final_query?.location);
  const [business_name, setBusinessName] = useState(final_query?.business_name);

  const handleClick = () => {
    setFinalQuery({
      ...final_query,
      location: search,
      business_name: business_name,
    });
  };
  return (
    <div className="search-area-main">
      <div className="search-area">
        <input
          type="text"
          placeholder="Buisness name"
          value={business_name}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Current Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-btns">
          <button>Change</button>
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
      {final_query?.location && (
        <div className="search-desc">
          <h3>
            Showing results for "{final_query?.location?.slice(0, 20)}" in
            Current Location
          </h3>
          <p>
            {data?.totalItems} businesses found <span>Refine search</span>
          </p>
        </div>
      )}

      {/* <div className="search-filter">
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
      </div> */}
    </div>
  );
}
