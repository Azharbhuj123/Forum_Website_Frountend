import React, { useEffect } from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import Banner from "../components/main-web/Banner";
import Features from "../components/main-web/Features/Features";
import Footer from "../components/main-web/Footer";

const Landing = () => {
  return (
    <>
      <AdminDashboardheader />
      <Banner/>
      <Features/>
      <Footer/>
    </>
  );
};

export default Landing;
