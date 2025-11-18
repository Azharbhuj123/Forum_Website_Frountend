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


const Routes = () => {




  return useRoutes([

    { path: "", element: <Landing />, },
    { path: "/search-business", element: <SearchBusiness />, },
    { path: "/discussions", element: <Discussions />, },
    { path: "/discussions-detail", element: <DiscussionsDetail />, },
    { path: "/business-detail", element: <BusinessDetail />, },
    { path: "/chat", element: <Chat />, },
    { path: "/profile", element: <Profile />, },
    { path: "/edit-profile", element: <EditProfile />, },

    { path: "/AdminDashboard", element: <AdminDashboardPage />, },
   
    { path: "/Login", element: <Login />, },
    { path: "/Singup", element: <Singup />, },
    { path: "/dashboard/*", element: <Dashboard />, },

  ]);
};

export default Routes;
