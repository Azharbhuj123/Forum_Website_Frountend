import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../components/login/Login";
import Singup from "../components/login/singup";
import Landing from "../pages/Landing";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import SearchBusiness from "../pages/SearchBusiness";
import BusinessDetail from "../pages/BusinessDetail";
import Discussions from "../pages/Discussions";
import DiscussionsDetail from "../pages/DiscussionsDetail";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import PropertyForm from "../pages/PropertyForm";
import PropertyDetail from "../pages/PropertyDetail";
import AuthPages from "../pages/SignUp";

const Routes = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  return useRoutes([
    {
      path: "",
      element: userData?.role === "Admin" ? <AdminDashboardPage /> : <Landing />,
    },

    { path: "/register", element: <AuthPages /> },
    // { path: "/forget-pass", element: <ForgotPass /> },
    { path: "/search-rental", element: <SearchBusiness /> },
    { path: "/discussions", element: <Discussions /> },
    { path: "/discussions-detail/:id", element: <DiscussionsDetail /> },
    { path: "/rental-detail/:id", element: <BusinessDetail /> },
    { path: "/chat", element: <Chat /> },
    { path: "/profile", element: <Profile /> },
    { path: "/edit-profile", element: <EditProfile /> },

    { path: "/AdminDashboard", element: <AdminDashboardPage /> },
    { path: "/property-form", element: <PropertyForm /> },
    { path: "/property-detail/:id", element: <PropertyDetail /> },

    { path: "/Login", element: <Login /> },
    { path: "/Singup", element: <Singup /> },
    { path: "/dashboard/*", element: <Dashboard /> },
    { path: "/pending-report", element: <Dashboard /> },
  ]);
};

export default Routes;
