import React from "react";
import Total_svg from "../Svg_components/Total_svg";
import TotalUsers_svg from "../Svg_components/TotalUsers_svg";
import TotalReviews_svg from "../Svg_components/TotalReviews_svg";
import ActiveUsers_svg from "../Svg_components/ActiveUsers_svg";
import PendingReports_svg from "../Svg_components/PendingReports_svg";
import Attention_svg from "../Svg_components/Attention_svg";
import Like_svg from "../Svg_components/Like_svg";
import dp from "../../assets/Images/dp.png";
const Overview = () => {

  const cardsData = [
    {
      title: "Total Users",
      value: "12,453",
      change: "+12% from last month",
      icon: <TotalUsers_svg />,
      changeIcon: <Total_svg />,
      red: false
    },
    {
      title: "Total Reviews",
      value: "8,932",
      change: "+8% from last month",
      icon: <TotalReviews_svg />,
      changeIcon: <Total_svg />,
      red: false
    },
    {
      title: "Active Users",
      value: "3,421",
      change: "+15% from last week",
      icon: <ActiveUsers_svg />,
      changeIcon: <Total_svg />,
      red: false
    },
    {
      title: "Pending Reports",
      value: "23",
      change: "Requires attention",
      icon: <PendingReports_svg />,
      changeIcon: <Attention_svg />,
      red: true
    }
  ];

  return (
    <div className="Overview">
      <div className="Overview-Users-box">

        {cardsData.map((item, index) => (
          <div className="Overview-Users-card" key={index}>

            <div className="Overview-user-title">
              <p>{item.title}</p>
              <h2>{item.value}</h2>

              <span className={item.red ? "red-color" : ""}>
                {item.changeIcon}
                <h3>{item.change}</h3>
              </span>
            </div>

            <div className={`Overview-user-icon ${item.red ? "red-icon-bg" : ""}`}>
              {item.icon}
            </div>

          </div>
        ))}

      </div>

      <div className="Recent-box">
        <h1>Recent Activity</h1>
        <div className="Recent-Activity-box">
          <div className="Recent-Activity-list">
            <div className="Recent-Activity-title">
              <div className="Recent-Activity-icon"><TotalReviews_svg /></div>
              <span><h2>New review submitted by Sarah Mitchell</h2>
                <p>5 minutes ago  </p></span>
            </div>
            <h4>New</h4>
          </div>

          <div className="Recent-Activity-list">
            <div className="Recent-Activity-title">
              <div className="Recent-Activity-icon"><TotalReviews_svg /></div>
              <span><h2>New review submitted by Sarah Mitchell</h2>
                <p>5 minutes ago  </p></span>
            </div>
            <h4>New</h4>
          </div>

          <div className="Recent-Activity-list">
            <div className="Recent-Activity-title">
              <div className="Recent-Activity-icon"><TotalReviews_svg /></div>
              <span><h2>New review submitted by Sarah Mitchell</h2>
                <p>5 minutes ago  </p></span>
            </div>
            <h4>New</h4>
          </div>

          <div className="Recent-Activity-list">
            <div className="Recent-Activity-title">
              <div className="Recent-Activity-icon"><TotalReviews_svg /></div>
              <span><h2>New review submitted by Sarah Mitchell</h2>
                <p>5 minutes ago  </p></span>
            </div>
            <h4>New</h4>
          </div>

          <div className="Recent-Activity-list">
            <div className="Recent-Activity-title">
              <div className="Recent-Activity-icon"><TotalReviews_svg /></div>
              <span><h2>New review submitted by Sarah Mitchell</h2>
                <p>5 minutes ago  </p></span>
            </div>
            <h4>New</h4>
          </div>
        </div>
      </div>

      <div className="Recent-box">
        <h1>Top Reviewers This Month</h1>

        <div className="Reviewers-Month-box">
          <div className="Reviewers-Month-list">
            <div className="Reviewers-Month-title">
              <h4>#1</h4>
              <div className="Reviewers-Month-icon">
                <img src={dp} alt="" />
              </div>

              <span>
                <h2>Sarah Mitchell</h2>
                <p>147 reviews</p>
              </span>
            </div>
            <Like_svg />
          </div>

          <div className="Reviewers-Month-list">
            <div className="Reviewers-Month-title">
              <h4>#2</h4>
              <div className="Reviewers-Month-icon">
                <img src={dp} alt="" />
              </div>

              <span>
                <h2>Sarah Mitchell</h2>
                <p>147 reviews</p>
              </span>
            </div>
            <Like_svg />
          </div>

          <div className="Reviewers-Month-list">
            <div className="Reviewers-Month-title">
              <h4>#3</h4>
              <div className="Reviewers-Month-icon">
                <img src={dp} alt="" />
              </div>

              <span>
                <h2>Sarah Mitchell</h2>
                <p>147 reviews</p>
              </span>
            </div>
            <Like_svg />
          </div>

          <div className="Reviewers-Month-list">
            <div className="Reviewers-Month-title">
              <h4>#4</h4>
              <div className="Reviewers-Month-icon">
                <img src={dp} alt="" />
              </div>

              <span>
                <h2>Sarah Mitchell</h2>
                <p>147 reviews</p>
              </span>
            </div>
            <Like_svg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
