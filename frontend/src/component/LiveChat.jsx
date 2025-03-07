import { useState, useEffect } from "react";
import io from "socket.io-client";

const LiveChat = ({ courseId, username }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("your_socket_server_url");
    setSocket(newSocket);

    newSocket.emit("join-room", courseId);

    newSocket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, [courseId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("send-message", {
        courseId,
        message,
        username,
      });
      setMessage("");
    }
  };

  return (
    <div className="live-chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="username">{msg.username}: </span>
            <span className="text">{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default LiveChat;
