import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { MessageCircle } from "lucide-react";

function Navbar() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Function to toggle the chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Function to handle message sending
  const sendMessage = () => {
    if (inputValue.trim() === "") return; // Do nothing if input is empty

    // Add the user message to the chat
    setMessages([...messages, { text: inputValue, sender: "user" }]);

    // Add a random response from the chatbot
    const randomResponses = [
      "Hello! How can I help you?",
      "I'm here to assist you.",
      "What can I do for you today?",
      "Feel free to ask me anything!",
    ];
    const randomResponse =
      randomResponses[Math.floor(Math.random() * randomResponses.length)];
    setMessages([
      ...messages,
      { text: inputValue, sender: "user" },
      { text: randomResponse, sender: "chatbot" },
    ]);

    // Clear the input field
    setInputValue("");
  };

  // Function to handle key press events in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter key (e.g., form submission)
      sendMessage();
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">SMART CLASSROOM</Link>
      </nav>
      <aside
        className="chatbot"
        style={{ right: isChatbotOpen ? "0px" : "-100%" }}
      >
        <div className="allchats">
          {messages.map((message, index) => (
            <div key={index} className={`${message.sender}-me`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press handler
          />
          <button className="btn-github" onClick={sendMessage}>
            Send
          </button>
        </div>
      </aside>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        <span></span>
        <span></span>
        <span></span>
        <span></span> <MessageCircle /> Chat Now
      </button>
      <Outlet />
    </>
  );
}

export default Navbar;
