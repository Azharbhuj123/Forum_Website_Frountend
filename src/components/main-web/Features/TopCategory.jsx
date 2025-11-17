import React from "react";
import Chart2_Svg from "../../Svg_components/Chart2_Svg";
import dish_svg from "../../../assets/Images/dish.png";
import beauty from "../../../assets/Images/beauty.png";
import education from "../../../assets/Images/education.png";
import fit from "../../../assets/Images/fit.png";
import tech from "../../../assets/Images/tech.png";
import art from "../../../assets/Images/art.png";
import service from "../../../assets/Images/service.png";
import travel from "../../../assets/Images/travel.png";
import dpOr from "../../../assets/Images/dp-or.png";
import Discussion_Svg from "../../Svg_components/Discussion_Svg";
import Comment_Svg from "../../Svg_components/Comment_Svg";

function TopCategory() {
  const top_category = [
    {
      id: 1,
      label: "Restaurants",
      value: "3,245",
      img: dish_svg,
    },
    {
      id: 2,
      label: "Beauty",
      value: "3,245",
      img: beauty,
    },
    {
      id: 3,
      label: "Education",
      value: "3,245",
      img: education,
    },
    {
      id: 4,
      label: "Fitness",
      value: "3,245",
      img: fit,
    },
    {
      id: 5,
      label: "Technology",
      value: "3,245",
      img: tech,
    },
    {
      id: 6,
      label: "Art & Design",
      value: "3,245",
      img: art,
    },
    {
      id: 7,
      label: "Services",
      value: "3,245",
      img: service,
    },
    {
      id: 8,
      label: "Travel",
      value: "3,245",
      img: travel,
    },
  ];


  const therad_data = [
    {
      id: 1,
      question: "Best hidden gem restaurants in Downtown?",
      user_img: dpOr,
      user_name: "Marcus Chen, Food & Dining",
      comments: 47,
      views: 1234,
      time: "2 hours ago",
    },
    {
      id: 2,
      question: "Best hidden gem restaurants in Downtown?",
      user_img: dpOr,
      user_name: "Marcus Chen, Food & Dining",
      comments: 47,
      views: 1234,
      time: "2 hours ago",
    },
    {
      id: 3,
      question: "Best hidden gem restaurants in Downtown?",
      user_img: dpOr,
      user_name: "Marcus Chen, Food & Dining",
      comments: 47,
      views: 1234,
      time: "2 hours ago",
    },
    {
      id: 4,
      question: "Best hidden gem restaurants in Downtown?",
      user_img: dpOr,
      user_name: "Marcus Chen, Food & Dining",
      comments: 47,
      views: 1234,
      time: "2 hours ago",
    },
  ];
  return (
    <div className="top-category">
      <div className="top-cat-head">
        <Chart2_Svg />
        <h1> Top Categories</h1>
      </div>

      <div className="top-cat-items">
        {top_category.map((item) => (
          <div className="top-cat-item" key={item.id}>
            <img src={item.img} alt="" />
            <h2>{item.label}</h2>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="top-cat-two-head">
        <div className="heading">
          <Discussion_Svg />
          <h1>Discussion Threads</h1>
        </div>

        <p className="viewall">View All {">"}</p>
      </div>

      <div className="main-theard">
        {therad_data.map((item) => (
          <div className="single-theard" key={item.id}>
            <h2 className="question">{item.question}</h2>
            <div className="reply-user">
              <img src={item.user_img} alt="" />
              <p className="name">{item.user_name}</p>
            </div>
            <div className="meta-div">
              <div className="status">
                <p>

                  <Comment_Svg /> {item.comments} comments
                </p>
                <p> {item.views} views</p>
              </div>
              <p>{item.time}</p>
            </div>
          </div>
        ))}
     
      </div>



    </div>
  );
}

export default TopCategory;
