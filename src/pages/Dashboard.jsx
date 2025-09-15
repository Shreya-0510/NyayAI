import React from "react";
import { Bookmark, FileText } from "lucide-react";

const Dashboard = () => {
  
  const recentDocs = [
    { id: 1, title: "Rental Agreement", date: "Sep 14, 2025" },
    { id: 2, title: "Employment Contract", date: "Sep 13, 2025" },
    { id: 3, title: "NDA Document", date: "Sep 12, 2025" },
  ];

  const savedDocs = [
    { id: 1, title: "Lease Agreement - Simplified", savedOn: "Sep 10, 2025" },
    { id: 2, title: "Vendor Contract - Simplified", savedOn: "Sep 09, 2025" },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Recent Chats/Documents */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Chats / Documents Processed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {doc.title}
                </h3>
                <FileText className="text-blue-600 w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600">Processed on {doc.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Saved Documents */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Saved / Bookmarked Simplified Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {doc.title}
                </h3>
                <Bookmark className="text-green-600 w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600">Saved on {doc.savedOn}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
