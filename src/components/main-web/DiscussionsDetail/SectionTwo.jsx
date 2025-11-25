import React from "react";
import Chart2_Svg from "../../Svg_components/Chart2_Svg";
import {
  Clock_gray,
  Green_Check,
  Like_Svg,
  Reply_Svg,
  View_svg,
} from "../../Svg_components/Svgs";
import Sponser from "../Sponser";
import Guidelines from "../Business_Components/Guidelines";

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
export default function SectionTwo({ data }) {
  const trendingTopics = [
    {
      id: "t1",
      svg: <View_svg />,
      name: "Views",
      status: data?.discussion?.viewsCount?.toLocaleString(),
    },
    {
      id: "t2",
      svg: <Reply_Svg />,
      name: "Comments",
      status: data?.discussion?.comments?.length,
    },
    {
      id: "t3",
      svg: <Like_Svg />,
      name: "Upvotes",
      status: data?.discussion?.likesCount?.toLocaleString(),
    },
    {
      id: "t4",
      svg: <Clock_gray />,
      name: "Last Activity",
      status: formatDate(data?.discussion?.createdAt),
    },
  ];

  return (
    <div className="c-community-widgets-container add">
      {/* Trending Topics Card */}
      <div className="c-trending-card">
        <div className="c-trending-header">
          <h3 className="c-trending-title">Discussion Stats</h3>
        </div>
        <ul className="c-trending-list">
          {trendingTopics.map((topic) => (
            <li key={topic.id} className="c-trending-item">
              <span className="c-trending-item-name">
                {topic?.svg} {topic.name}
              </span>
              <span className="">{topic.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Community Guidelines Card */}
      <Guidelines />

      <Sponser />
    </div>
  );
}
