import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard1 from "../components/main-dashbord/Sidebar-box/Dashboard1";




const DashboardRoutes = () => {
  return (
    // ts
    <Routes>
      <Route path="/" element={<Dashboard1 />} />

    </Routes>
  );
};

export default DashboardRoutes;
