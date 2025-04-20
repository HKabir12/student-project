import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Logo/Spacer */}
        <div className="w-1/3 text-left">
          <span className="text-sm font-medium text-gray-500">IIT-JU</span>
        </div>

        {/* Center Title */}
        <div className="w-1/3 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            Smart Student Management
          </h1>
        </div>

        {/* Right - Login/Logout */}
        <div className="w-1/3 text-right">
          {user ? (
            <button
              onClick={logout}
              className="font-semibold text-red-600 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-6 py-3 border-t">
        <Link
          to="/"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Home Panel
        </Link>

        <Link
          to="/admin"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Admin Panel
        </Link>
        <Link
          to="/student"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Student Panel
        </Link>
        <Link
          to="/teacher"
          className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Teacher Panel
        </Link>
      </div>
    </div>
  );
}
