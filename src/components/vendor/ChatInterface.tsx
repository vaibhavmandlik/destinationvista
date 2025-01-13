import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Handle sending a message
  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Chat with Super Admin</h5>
        </div>
        <div
          className="card-body"
          style={{
            height: "400px",
            overflowY: "auto",
            backgroundColor: "#f8f9fa",
          }}
        >
          {messages.length === 0 ? (
            <p className="text-muted text-center mt-5">No messages yet</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex ${
                  message.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                } mb-2`}
              >
                <div
                  className={`p-2 rounded ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="card-footer bg-white">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
