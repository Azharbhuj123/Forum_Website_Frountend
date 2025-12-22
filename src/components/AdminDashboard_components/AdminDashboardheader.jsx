import React, { useEffect, useState } from "react";
import Search_Svg from "../Svg_components/Search_Svg";
import Home_svg from "../Svg_components/Home_svg";
import Message_svg from "../Svg_components/Message_svg";
import Chart_svg from "../Svg_components/Chart_svg";
import Bell_svg from "../Svg_components/Bell_svg";
import logo from "../../assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { Location_Svg } from "../Svg_components/Svgs";

// For now, we'll just use text for the button
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const AdminDashboardheader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userToken = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [searchQuery, setSearchQuery] = useState({
    rooms: null,
    location: null,
  });
  const navigate = useNavigate();

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <>
      <header className="AdminDashboardheader">
        <div className="Main-AdminDashboardheader">
          <div
            onClick={() => navigate("/")}
            className="AdminDashboardheader-logo"
          >
            <img src={logo} alt="" />
          </div>

          {userData?.name && (
            <div className="heading-intro">
            <h3>Welcome, {userData?.name || "User"} 👋</h3>
          </div>
          )}

          {/* New Hamburger Button: Visible only on small screens via CSS */}
          <button
            className="AdminDashboardheader-menu-toggle"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </button>

          {/* Apply a conditional class based on state. 
                      This class will be used in CSS to control visibility and design.
                    */}
          <div
            className={`AdminDashboardheader-btn-box ${
              isMenuOpen ? "open" : ""
            }`}
          >
            <div
              className="AdminDashboardheader-icon"
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
            >
              <Home_svg />
            </div>
            <div
              className="AdminDashboardheader-icon"
              onClick={() => {
                navigate("/discussions");
                setIsMenuOpen(false);
              }}
            >
              <Chart_svg />
            </div>
            <div
              className="AdminDashboardheader-icon"
              onClick={() => {
                navigate("/chat");
                setIsMenuOpen(false);
              }}
            >
              <Message_svg />
            </div>
            {/* <div className="AdminDashboardheader-icon">
              <Bell_svg />
            </div> */}
            {userToken ? (
              <div
                onClick={() => navigate("/profile")}
                className="user-profile"
              >
                <img src={userData?.profile_img} alt="" />
              </div>
            ) : (
              <button onClick={() => navigate("/register")}>Sign In</button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminDashboardheader;
