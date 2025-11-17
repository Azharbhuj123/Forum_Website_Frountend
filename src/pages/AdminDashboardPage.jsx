import React, { useEffect } from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import AdminDashboardbox from "../components/AdminDashboard_components/AdminDashboardbox";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="AdminDashboardPage">
        <div className="AdminDashboard-header">
          <AdminDashboardheader />
        </div>

        <div className="AdminDashboard-box">
          <AdminDashboardbox />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
