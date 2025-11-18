import React, { useState } from 'react'
import AdminDashboardheader from '../components/AdminDashboard_components/AdminDashboardheader'
import ChatScreen from '../components/main-web/Chat/ChatScreen'
import Sidebar from '../components/main-dashbord/Dashboard-sidebar/Sidebar';
import ChatArea from '../components/main-web/Chat/ChatArea';
import ChatSideBar from '../components/main-web/Chat/SideBar';
import Footer from '../components/main-web/Footer';

export default function Chat() {

  const [activeConversation, setActiveConversation] = useState(2);

  const conversations = [
    {
      id: 1,
      name: 'Marcus Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      preview: 'Thanks for the restaurant recommendation!',
      time: '10:45 AM',
      unread: 0
    },
    {
      id: 2,
      name: 'Elena Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      preview: 'Would love to connect and discuss...',
      time: '9:30 AM',
      unread: 2
    },
    {
      id: 3,
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=33',
      preview: 'See you at the coworking space tomorrow!',
      time: 'Yesterday',
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'them',
      text: "Hey! Thanks for the amazing review on La Cocina Mexicana. I've been wanting to try it!",
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'them',
      text: 'Thanks for the recommendation!',
      time: '10:45 AM'
    },
    {
      id: 3,
      sender: 'me',
      text: 'You should definitely go! The ambiance is perfect for a nice dinner.',
      time: ''
    }
  ];

  const activeConv = conversations.find(c => c.id === activeConversation);

  return (
    <div>
      <AdminDashboardheader/>

      <div className="feautures-main Dashboard-container chat-main">
        <ChatSideBar
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
      />
      <ChatArea conversation={activeConv} messages={messages} />
    </div>


    <Footer/>

 
  





    </div>
  )
}
