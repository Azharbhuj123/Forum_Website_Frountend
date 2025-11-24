import React from "react";
import Star_Svg from "../Svg_components/Star_Svg";

export default function FilterBox({ setFinalQuery, final_query }) {
  console.log(final_query, "final_query");

  const handleClear = () => {
    setFinalQuery({
      ...final_query,
      rating: null,
      rooms: null,
      location: null,
      price: null,
    });
  };
  return (
    <div className="filter-box-main">
      <div className="heading">
        <h3>Filters</h3>
        <h3 onClick={handleClear}>Clear all</h3>
      </div>

      <div className="filter-items">
        <div className="filter-item">
          <h2>Rating</h2>
          {[4, 3, 2].map((star) => (
            <div className="option" key={star}>
              <input
                type="radio"
                name="rating"
                value={star}
                checked={final_query?.rating === star}
                onChange={() => setFinalQuery({ ...final_query, rating: star })}
              />
              <label>
                <Star_Svg />
                {star}+ Stars
              </label>
            </div>
          ))}
        </div>

        <div className="filter-item">
          <h2>Rooms</h2>
          {[5, 10, 15, 20].map((apar) => (
            <div className="option" key={apar}>
              <input
                type="radio"
                name="rooms"
                checked={final_query?.rooms === apar}

                onChange={() => setFinalQuery({ ...final_query, rooms: apar })}
              />
              <label>{apar}+</label>
            </div>
          ))}
        </div>

        <div className="filter-item">
          <h2>Location</h2>
          <div className="option">
            <input
              type="text"
              placeholder="Please enter location"
              className="location-inp"
              value={final_query?.location}
                onChange={(e) => setFinalQuery({ ...final_query, location: e.target.value })}

            />
          </div>
        </div>

        <div className="filter-item">
          <h2>Price</h2>
            {[25,50,100, 300, 500, 1000].map((price) => (
            <div className="option" key={price}>
              <input
                type="radio"
                name="Price"
                checked={final_query?.price === price}

                onChange={() => setFinalQuery({ ...final_query, price: price })}
              />
              <label>${price}+</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
