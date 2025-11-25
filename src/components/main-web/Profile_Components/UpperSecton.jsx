import React from "react";
import profile from "../../../assets/Images/profile.png";

import { useQuery } from "@tanstack/react-query";

import {
  Calendar_svg2,
  Followers_Svg,
  Star_OR_Svg,
  Thumb_Svg_OR,
} from "../../../components/Svg_components/Svgs";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import { Skeleton } from "antd";
export default function UpperSecton() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => fetchData(`/auth/my-detail`),
    keepPreviousData: true,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 0 }} />;
  }
  return (
    <>
      <button className="back-button" onClick={() => window.history.back()}>
        <span className="back-arrow">‹</span> Back
      </button>
      <div class="smitchell-profile-card">
        <div class="smitchell-profile-header">
          <div class="smitchell-profile-cover"></div>
          <div class="smitchell-profile-info-container">
            <div class="smitchell-profile-avatar-wrapper">
              <img
                src={data?.profile_img}
                alt="Sarah Mitchell"
                class="smitchell-profile-avatar"
              />
              <span class="smitchell-profile-online-indicator"></span>
            </div>

            <div class="smitchell-profile-name-section">
              <h1 class="smitchell-profile-name">{data?.name}</h1>
              <div className="action-btns">
                <button
                  class="smitchell-profile-edit-button"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </button>
                <button
                  class="smitchell-profile-edit-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* <div class="smitchell-profile-badges">
              <span class="smitchell-profile-badge smitchell-profile-badge-top-reviewer">
                Top Reviewer
              </span>
              <span class="smitchell-profile-badge smitchell-profile-badge-top-reviewer">
                Local Guide
              </span>
            </div> */}

            <div class="smitchell-profile-meta">
              <span class="smitchell-profile-joined">
                <Calendar_svg2 /> Joined {data?.createdAt?.split("T")[0]}
              </span>
            </div>

            <div class="smitchell-profile-stats">
              <div class="smitchell-profile-stat-item">
                <span class="smitchell-profile-stat-value">
                  <Star_OR_Svg /> {data?.rating}
                </span>
                <span class="smitchell-profile-stat-label">Reviews</span>
              </div>
              <div class="smitchell-profile-stat-item">
                <span class="smitchell-profile-stat-value">
                  <Followers_Svg /> {data?.followersCount || 0}
                </span>
                <span class="smitchell-profile-stat-label">Followers</span>
              </div>
              <div class="smitchell-profile-stat-item">
                <span class="smitchell-profile-stat-value">
                  <Thumb_Svg_OR /> {data?.likesCount}
                </span>
                <span class="smitchell-profile-stat-label">Helpful Votes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
