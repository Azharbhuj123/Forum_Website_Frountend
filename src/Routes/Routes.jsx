import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../components/login/Login";
import Singup from "../components/login/singup";
import Landing from "../pages/Landing";
import AdminDashboardPage from "../pages/AdminDashboardPage";

const Routes = () => {

 


  return useRoutes([

    { path: "", element: <Landing />, },

    { path: "/AdminDashboard", element: <AdminDashboardPage />, },

    { path: "/Login", element: <Login />,  },

    { path: "/Singup", element: <Singup />, },

    { path: "/dashboard/*", element: <Dashboard />, },

  ]);
};

export default Routes;
