import React from "react";
import Remove_svg from "../Svg_components/Remove_svg";
import Approve_Svg from "../Svg_components/Approve_Svg";
import dp from "../../assets/Images/dp.png";

const Reviews = () => {
  const reviewsData = [
    {
      name: "Sarah Mitchell",
      restaurant: "La Cocina Mexicana",
      text: "Best Properties in Town!",
      date: "2024-11-01",
    },
    {
      name: "John Parker",
      restaurant: "Italiano Pizzeria",
      text: "Amazing Pizza!",
      date: "2024-11-02",
    },
    {
      name: "Emily Rose",
      restaurant: "Sushi House",
      text: "Loved the California rolls",
      date: "2024-11-03",
    },
    {
      name: "Michael Smith",
      restaurant: "Burger Hut",
      text: "Crispy fries & juicy burger!",
      date: "2024-11-04",
    },
    {
      name: "David Wilson",
      restaurant: "Taco Town",
      text: "Fresh & tasty Tacos!",
      date: "2024-11-05",
    },
  ];

  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>Recent Reviews</h1>
            <span>
              <button>Filter</button> <button>Export</button>
            </span>
          </div>

          <div className="Reviews-box">
            {reviewsData.map((item, index) => (
              <div className="Reviews-box-list" key={index}>
                <div className="Reviews-box-list-title">
                  <div className="Reviews-box-list-dp">
                    <img src={dp} alt="" />
                    <span>
                      <h2>{item.name}</h2> <h3>reviewed</h3>{" "}
                      <h4>{item.restaurant}</h4>
                    </span>
                  </div>
                  <p>{item.text}</p>
                  <h3>{item.date}</h3>
                </div>

                <div className="Reviews-box-list-btn">
                  <button>
                    <Approve_Svg /> Approve
                  </button>
                  <button className="Remove">
                    <Remove_svg /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Reviews;
