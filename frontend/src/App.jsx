import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          {/* ✅ Chat route simplified (no :docId param for now) */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
}
