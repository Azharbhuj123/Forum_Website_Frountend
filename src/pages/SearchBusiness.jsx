import React from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import SearchComponent from "../components/main-web/SearchComponent";
import SearchItems from "../components/main-web/SearchItems";
import Footer from "../components/main-web/Footer";

export default function SearchBusiness() {
  return (
    <div>
      <AdminDashboardheader />
      <div className="feautures-main Dashboard-container">
        <SearchComponent />
        <SearchItems />
      </div>
      <Footer />
    </div>
  );
}
