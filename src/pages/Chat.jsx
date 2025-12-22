import React, { useEffect, useState } from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import ChatScreen from "../components/main-web/Chat/ChatScreen";
import Sidebar from "../components/main-dashbord/Dashboard-sidebar/Sidebar";
import ChatArea from "../components/main-web/Chat/ChatArea";
import ChatSideBar from "../components/main-web/Chat/SideBar";
import Footer from "../components/main-web/Footer";
import { useLocation } from "react-router-dom";
import { fetchData } from "../queryFunctions/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

export default function Chat() {
  const location = useLocation();
  const firstToTalk = location.state?.userId || null;
   const [isMobile, setIsMobile] = useState(false);

  

  const [activeConversation, setActiveConversation] = useState(firstToTalk);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["user-chat", firstToTalk, search],
    queryFn: () =>
      fetchData(`/chat/chat-list?topUserId=${firstToTalk}&search=${search}`),
    keepPreviousData: true,
  });

  const conversations = data?.data?.map((chat) => ({
    id: chat._id,
    userId: chat?.userId,
    name: chat.name,
    avatar: chat.profile_img,
    preview: chat.lastMessage || "",
    time: chat.lastMessageTime || "",
    unread: chat.unreadCount || 0,
  }));

  const activeConv = conversations?.find(
    (c) => c.userId === activeConversation
  );

useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [window.innerWidth]);

  // if (isLoading) return <Loader />;

  return (
    <div>
      <AdminDashboardheader />

      <div className="feautures-main Dashboard-container chat-main">
        <ChatSideBar
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={setActiveConversation}
          setSearch={setSearch}
          isMobile={isMobile}
        />
         
        <ChatArea conversation={activeConv} isMobile={isMobile} onSelectConversation={setActiveConversation} />
      </div>

      <Footer />
    </div>
  );
}
