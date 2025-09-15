// src/pages/Chat.jsx
import React from "react";
import ClauseCarousel from "../components/ClauseCarousel";

const Chat = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F2] py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#2D2A26] mb-10">
        Simplified Insights
      </h1>
      <ClauseCarousel />
    </div>
  );
};

export default Chat;
