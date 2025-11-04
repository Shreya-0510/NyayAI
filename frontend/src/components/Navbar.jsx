import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#f9f8f6] border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-semibold text-[#3b2f2f]">
        NyayAI
      </Link>

      {/* Nav Links */}
      <div className="space-x-6 hidden md:flex">
        <Link to="/" className="text-gray-700 hover:text-[#5a4034]">
          Home
        </Link>
        <Link to="/upload" className="text-gray-700 hover:text-[#5a4034]">
          Upload
        </Link>
        <Link to="/chat/123" className="text-gray-700 hover:text-[#5a4034]">
          Cards
        </Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-[#5a4034]">
          Dashboard
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 text-sm bg-[#5a4034] text-white rounded-lg hover:bg-[#3b2f2f] transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 text-sm border border-[#5a4034] text-[#5a4034] rounded-lg hover:bg-[#f0e9e5] transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
