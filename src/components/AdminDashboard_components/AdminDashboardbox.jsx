import React, { useState } from "react";
import Settings_svg from "../Svg_components/Settings_svg";
import Overview_svg from "../Svg_components/Overview_svg";
import Reviews_svg from "../Svg_components/Reviews_svg";
import Reports_svg from "../Svg_components/Reports_svg";
import Users_svg from "../Svg_components/Users_svg";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Users from "./Users";
import Reports from "./Reports";
import Listings from "./Listings";
import { CiSettings } from "react-icons/ci";

const AdminDashboardbox = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="Dashboard-box">
        <div className="Dashboard-container">
          <div className="Dashboard-title">
            <span>
              <h2>Admin Dashboard</h2>
              <p>Manage and moderate your community</p>
            </span>

            <button>
              <CiSettings szie={50} /> Settings
            </button>
          </div>

          {/* TAB BUTTONS */}
          <div className="Dashboard-tab-box">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              <Overview_svg />
              <p>Overview</p>
            </button>

            <button
              className={activeTab === "listings" ? "active" : ""}
              onClick={() => setActiveTab("listings")}
            >
              <Reviews_svg />
              <p>Listings</p>
            </button>

            {/* <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              <Reviews_svg />
              <p>Reviews</p>
            </button> */}

            <button
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              <Users_svg />
              <p>Users</p>
            </button>

            <button
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <Reports_svg /><p>Reports</p>
            </button>
          </div>

          {/* TAB CONTENTS */}
          {activeTab === "overview" && <Overview />}
          {activeTab === "listings" && <Listings />}

          {activeTab === "reviews" && <Reviews />}

          {activeTab === "users" && <Users />}

          {activeTab === "reports" && <Reports />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardbox;
