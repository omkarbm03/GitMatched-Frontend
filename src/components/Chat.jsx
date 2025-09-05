import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "../utils/constants";

let socket;

const Chat = () => {
  const { targetUserId } = useParams(); // 👈 matches your <Route path>
  const partnerId = targetUserId;
  const user = useSelector((store) => store.user); // logged-in user

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // connect socket
    socket = io(BASE_URL, { withCredentials: true });

    if (user?._id && partnerId) {
      // generate unique room for both users
      const roomId =
        user._id < partnerId
          ? `${user._id}_${partnerId}`
          : `${partnerId}_${user._id}`;

      socket.emit("joinRoom", roomId);

      // listen for incoming messages
      socket.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [user, partnerId]);

  // auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: user._id,
      receiverId: partnerId,
      text: newMessage,
      timestamp: new Date(),
    };

    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]); // optimistic update
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-2xl mx-auto my-6 bg-base-300 rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-600 text-lg font-semibold">
        💬 Chat with {partnerId}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${
              msg.senderId === user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                msg.senderId === user._id
                  ? "bg-primary text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-600 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
