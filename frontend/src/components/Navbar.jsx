import { useAuth } from "react-oidc-context";
import LogoutButton from "../pages/LogoutButton"; // ✅ import your new logout component

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav className="bg-[#f9f8f6] border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
      <a href="/" className="text-2xl font-semibold text-[#3b2f2f]">
        NyayAI
      </a>

      <div className="space-x-6 hidden md:flex">
        <a href="/" className="text-gray-700 hover:text-[#5a4034]">Home</a>
        <a href="/upload" className="text-gray-700 hover:text-[#5a4034]">Upload</a>
        <a href="/dashboard" className="text-gray-700 hover:text-[#5a4034]">Dashboard</a>
      </div>

      <div className="space-x-4">
        {auth.isAuthenticated ? (
          <>
            <span className="text-gray-700">
              Hi, {auth.user?.profile?.email}
            </span>
            {/* ✅ Replaced inline logout logic with separate component */}
            <LogoutButton />
          </>
        ) : (
          <button
            onClick={() => auth.signinRedirect()}
            className="px-4 py-2 text-sm bg-[#5a4034] text-white rounded-lg hover:bg-[#3b2f2f]"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
