import React from "react";
import Chart2_Svg from "../../Svg_components/Chart2_Svg";
import { Clock_gray, Green_Check, Like_Svg, Reply_Svg, View_svg } from "../../Svg_components/Svgs";
import Sponser from "../Sponser";
import Guidelines from "../Business_Components/Guidelines";

export default function SectionTwo() {
  const trendingTopics = [
    { id: "t1", svg: <View_svg />, name: "Views", status: "1,234" },
    { id: "t2", svg: <Reply_Svg />, name: "Comments", status: "47" },
    { id: "t3", svg: <Like_Svg />, name: "Upvotes", status: "142" },
    { id: "t4", svg: <Clock_gray />, name: "Last Activity", status: "Yesterday" },
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
              <span className="c-trending-item-name">{topic?.svg} {topic.name}</span>
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
