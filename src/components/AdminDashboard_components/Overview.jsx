import React from "react";
import Total_svg from "../Svg_components/Total_svg";
import TotalUsers_svg from "../Svg_components/TotalUsers_svg";
import TotalReviews_svg from "../Svg_components/TotalReviews_svg";
import ActiveUsers_svg from "../Svg_components/ActiveUsers_svg";
import PendingReports_svg from "../Svg_components/PendingReports_svg";
import Attention_svg from "../Svg_components/Attention_svg";
import Like_svg from "../Svg_components/Like_svg";
import dp from "../../assets/Images/dp.png";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../queryFunctions/queryFunctions";
import Loader from "../Loader";

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const now = new Date();

  const diffMs = now - date; // difference in milliseconds
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  // Same day → Today or hours ago
  const isToday = date.toDateString() === now.toDateString();

  // Yesterday check
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  // If today
  if (isToday) {
    if (diffHours >= 1) return `${diffHours} hours ago`;
    if (diffMinutes >= 1) return `${diffMinutes} minutes ago`;
    return "Just now";
  }

  // If yesterday
  if (isYesterday) {
    return "Yesterday";
  }

  // Else → return short date
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
}

const Overview = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchData(`/admin/stats`),
    keepPreviousData: true,
  });

  const cardsData = [
    {
      title: "Total Users",
      value: data?.totalUsers,
      change: ` ${data?.userIncreasePercent}% from last month`,
      icon: <TotalUsers_svg />,
      changeIcon: <Total_svg />,
      red: false,
    },
    {
      title: "Total Reviews",
      value: `${data?.totalReviews}`,
      change: `+${data?.reviewIncreasePercent}%% from last month`,
      icon: <TotalReviews_svg />,
      changeIcon: <Total_svg />,
      red: false,
    },
    {
      title: `Active Users`,
      value: `${data?.activeUsersCount}`,
      change: `+${data?.activeUsersIncreasePercent}% from last month`,
      icon: <ActiveUsers_svg />,
      changeIcon: <Total_svg />,
      red: false,
    },
    {
      title: `Pending Reports`,
      value: data?.total_report || 0,
      change: `Requires attention`,
      icon: <PendingReports_svg />,
      changeIcon: <Attention_svg />,
      red: true,
    },
  ];

  if (isLoading) return <Loader />;

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
                <h3> {item.change}</h3>
              </span>
            </div>

            <div
              className={`Overview-user-icon ${item.red ? "red-icon-bg" : ""}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="Recent-box">
        <h1>Recent Activity</h1>
        <div className="Recent-Activity-box">
          {data?.recentActivityList?.length === 0 && (
            <div className="no-property">
              <p>No Activity Found!</p>
            </div>
          )}
          {data?.recentActivityList?.length > 0 && data?.recentActivityList?.map((item, index) => (
            <div key={index} className="Recent-Activity-list">
              <div className="Recent-Activity-title">
                <div className="Recent-Activity-icon">
                  <TotalReviews_svg />
                </div>
                <span>
                  <h2>{item?.title}</h2>
                  <p>{formatDate(item?.createdAt)}</p>
                </span>
              </div>
              <h4>New</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="Recent-box">
        <h1>Top Reviewers This Month</h1>

        <div className="Reviewers-Month-box">
           {data?.topReviewers?.length === 0 && (
            <div className="no-property">
              <p>No Top Reviewers This Month!</p>
            </div>
          )}
          {data?.topReviewers?.length > 0 && data?.topReviewers?.map((item, index) => (

          <div className="Reviewers-Month-list">
            <div className="Reviewers-Month-title">
              <h4>#{index + 1}</h4>
              <div className="Reviewers-Month-icon">
                <img src={item?.profile_img} alt="" />
              </div>

              <span>
                <h2>{item?.name}</h2>
                <p>{item?.reviewCount} reviews</p>
              </span>
            </div>
            <Like_svg />
          </div>

          ))}

           
        </div>
      </div>
    </div>
  );
};

export default Overview;
