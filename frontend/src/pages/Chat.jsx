import React from "react";
import { useLocation } from "react-router-dom";
import ClauseCarousel from "../components/ClauseCarousel";

const Chat = () => {
  const location = useLocation();
  const clauses = location.state?.clauses || []; 

  return (
    <div className="min-h-screen bg-[#F9F6F2] py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#2D2A26] mb-10">
        Simplified Insights
      </h1>

      {/* ✅ Only show if data available */}
      {clauses.length > 0 ? (
        <ClauseCarousel clauses={clauses} />
      ) : (
        <p className="text-center text-gray-500">
          No analysis available. Please upload a document first.
        </p>
      )}
    </div>
  );
};

export default Chat;
