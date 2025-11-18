import React, { useEffect } from "react";
import Search_Svg from "../Svg_components/Search_Svg";
import Home_svg from "../Svg_components/Home_svg";
import Message_svg from "../Svg_components/Message_svg";
import Chart_svg from "../Svg_components/Chart_svg";
import Bell_svg from "../Svg_components/Bell_svg";
import logo from "../../assets/Images/logo.png";
const AdminDashboardheader = () => {
  return (
    <>
      <header className="AdminDashboardheader">
        <div className="Main-AdminDashboardheader">
          <div className="AdminDashboardheader-logo">
            <img src={logo} alt="" />
          </div>

          <div className="AdminDashboardheader-Search">
            <input type="text" placeholder="Search businesses, reviews, or users..." />
            <button><Search_Svg /></button>
          </div>

          <div className="AdminDashboardheader-btn-box">
            <div className="AdminDashboardheader-icon"><Home_svg /></div>
            <div className="AdminDashboardheader-icon"><Chart_svg /></div>
            <div className="AdminDashboardheader-icon"><Message_svg /></div>
            <div className="AdminDashboardheader-icon"><Bell_svg /></div>
            <button>Sign In</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminDashboardheader;












  




