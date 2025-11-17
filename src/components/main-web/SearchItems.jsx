import React from "react";
import FilterBox from "./FilterBox";
import BusinessCard from "./BusinessCard";
import MapView from "./MapView";

export default function SearchItems() {
  return (
    <div className="search-items-main">
      <div className="search-items-left">
        <FilterBox />
      </div>
      <div className="search-items-center">
        <p className="para-status">Showing 1-6 of 1,234 results</p>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <BusinessCard />
        ))}
         
        </div>
        <div className="search-items-right">
          <MapView />
        </div>
    </div>
  );
}
