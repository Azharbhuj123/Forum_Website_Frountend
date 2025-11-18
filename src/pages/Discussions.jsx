import React from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import SectionOne from "../components/main-web/Discussions/SectionOne";
import SectionTwo from "../components/main-web/Discussions/SectionTwo";
import SectionThree from "../components/main-web/Discussions/SectionThree";
import Footer from "../components/main-web/Footer";

export default function Discussions() {
  return (
    <div>
      <AdminDashboardheader />
      <div className="feautures-main Dashboard-container">
        <SectionOne />
        <div className="section-divider">
          <div className="divider-one">
            <SectionTwo />
          </div>
          <div className="divider-two">
            <SectionThree />
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
