import React from "react";
import Chart2_Svg from "../../Svg_components/Chart2_Svg";
import dpOr from "../../../assets/Images/dp-or.png";
import {
  Clock_gray,
  Clock_Svg,
  Reply_Svg,
  View_svg,
} from "../../Svg_components/Svgs";
import ViewProfile_svg from "../../Svg_components/ViewProfile_svg";
import { useNavigate } from "react-router-dom";

export default function SectionTwo() {
  const filters = [
    "All",
    "Food & Dining",
    "Beauty & Wellness",
    "Work & Services",
    "Travel",
    "Tech",
  ];
  const card_data = [
    {
      id: 1,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
    {
      id: 2,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
    {
      id: 3,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
    {
      id:4 ,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
  ];

  const navigate = useNavigate();


  return (
    <div className="discussion-main-card">
      <input type="text" placeholder="Search discussions..." />
      <div className="filters-box">
        {filters.map((filter, index) => (
          <button key={index} className={index === 0 ? "active" : ""}>
            {filter}
          </button>
        ))}
      </div>

      <div className="main-discussion-cards">
        {card_data.map((card) => (
          <div className="discussion-card" key={card.id} onClick={()=>navigate('/discussions-detail')}>
            <div className="head">
              <h1>{card.title}</h1>
              <Chart2_Svg />
            </div>
            <div className="reply-user padding">
              <img src={dpOr} alt="" />
              <p className="name">{card.user}</p>
            </div>
            <div className="feautures">
              <p className="tarvel">{card.category}</p>
              <p className="reply">
                <Reply_Svg /> {card.replies} Replies
              </p>

              <p className="reply">
                <View_svg />
                {card.views} views
              </p>
              <p className="reply">
                <Clock_gray /> {card.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more">
        <button>
          Load More Discussions 
        </button>
      </div>
    </div>
  );
}
