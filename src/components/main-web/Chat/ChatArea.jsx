import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useActionMutation from "../../../queryFunctions/useActionMutation";
import { showError } from "../../Toaster";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import Loader from "../../Loader";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ChatArea({ conversation }) {
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [messages, setMessages] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["user-chat-history", userData?._id, conversation?.userId],
    queryFn: () =>
      fetchData(
        `/chat/?sender=${userData?._id}&receiver=${conversation?.userId}`
      ),
    keepPreviousData: true,
    enabled: !!conversation?.userId,
  });

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const formattedMessages = data.map((msg) => ({
      id: msg._id,
      sender: msg.sender._id === userData?._id ? "me" : "them",
      text: msg.message,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    setMessages(formattedMessages); // replace old messages with fetched messages
  }, [data]);

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      const newMsg = data.data; // backend response

      // Format backend response for frontend
      const formattedMsg = {
        id: newMsg?._id, // or use newMsg._id if you prefer
        sender: newMsg.sender._id === userData?._id ? "me" : "them",
        text: newMsg.message,
        time: new Date(newMsg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Update state by adding new message at the end
      setMessages((prev) => [...prev, formattedMsg]);
    },
    onErrorCallback: (errmsg) => {
      showError(errmsg);
    },
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");

      const data_obj = {
        receiver: conversation?.userId,
        message: messageInput,
      };

      triggerMutation({
        endPoint: "/chat/",
        body: data_obj,
        method: "post",
      });
    }
  };
  useEffect(() => {
    if (!conversation) {
      setMessages([]);
    }
  }, [conversation]);

  return (
    <div className="chat-area">
      {conversation && (
        <div className="chat-header">
          <div onClick={() => navigate("/profile")} className="user-info">
            <img src={conversation?.avatar} alt={conversation?.name} />
            <div className="user-details">
              <h3>{conversation?.name}</h3>
              <span className="statuss">Active now</span>
            </div>
          </div>

          <button className="more-btn">⋮</button>
        </div>
      )}

      <div className="messages-container">
        {isLoading && (
          <div className="chatspinner">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </div>
        )}
        {!isLoading && messages?.length === 0 && (
          <div style={{ height: "100%" }} className="no-property">
            <p>
              No chats yet. Start a conversation by sending your first message
            </p>
          </div>
        )}

        {!isLoading &&
          messages?.length > 0 &&
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${
                msg.sender === "me" ? "sent" : "received"
              }`}
            >
              {msg.sender !== "me" && (
                <img
                  src={conversation?.avatar}
                  alt={conversation?.name}
                  className="msg-avatar"
                />
              )}
              <div
                className={`message-bubble ${
                  msg.sender === "me" ? "my-message" : "their-message"
                }`}
              >
                {msg.text}
                {msg.time && (
                  <div
                    className={`${
                      msg.sender !== "me" ? "new-msg-time" : "msg-time"
                    }`}
                  >
                    {msg.time}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="send-btn" onClick={handleSendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}
