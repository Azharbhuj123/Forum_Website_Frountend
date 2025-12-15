import React, { useState } from "react";
import nextIcon from "../Svg_components/next.svg";
import { useNavigate } from "react-router-dom";
import Search_Svg from "../Svg_components/Search_Svg";
import { Location_Svg } from "../Svg_components/Svgs";

function Banner() {
  const navigate = useNavigate();
 const [searchQuery, setSearchQuery] = useState({
    rooms: null,
    location: null,
  });

  const handleNavigate = () => {

    navigate("/search-rental",{
      state:searchQuery
    });
  };
  return (
    <div className="main-banner">
      <div className="content">
        <div className="content-part"><h1>List Your Property for Sale or Rent
</h1>
        <p>
         Search and discover properties by location, property name, or price—find your perfect home or investment in seconds.
        </p>
        </div>
          <div className="AdminDashboardheader-Search">
            <div className="SearchBar">
              <div className="SearchBar-section">
                <Search_Svg />
                <input
                  type="text"
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, business_name: e.target.value })
                  }
                  placeholder="Search listing by name.."
                />
              </div>

              <div className="divider"></div>

              <div className="SearchBar-section">
                <Location_Svg />
                <input
                  type="text"
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, location: e.target.value })
                  }
                  placeholder="Enter city or location"
                />
              </div>

              <button onClick={handleNavigate} className="search-btn">
                Search
              </button>
            </div>
          </div>
      </div>
 
         
      
    </div>
  );
}

export default Banner;
