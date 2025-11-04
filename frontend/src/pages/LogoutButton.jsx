// LogoutButton.jsx
import { useAuth } from "react-oidc-context";

export default function LogoutButton() {
  const auth = useAuth();

  const handleLogout = () => {
    const cognitoDomain = "https://us-east-1vfvrvho03.auth.us-east-1.amazoncognito.com";
    const clientId = "1qphnf8p4ng8grengkj2b7t7ve";
    const logoutUri = "http://localhost:5173/";

    // Step 1: clear OIDC local state
    auth.removeUser();

    // Step 2: redirect to Cognito's hosted logout
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}
