import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useAuth();

  return (
    <div className="mt-32 px-4 sm:px-6 lg:px-8 text-center">
      {/* Admin Panel Heading */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
        Admin Panel
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-600">
        Here admin can manage students, teachers and settings.
      </p>

      {/* Admin login check */}
      {!user ? (
        <div className="mt-6">
          <p className="text-base sm:text-lg text-gray-500">
            You must be logged in as an Admin to access this panel.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Admin Login
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-base sm:text-lg text-green-600">
            Welcome, {user.name}!
          </p>

          {/* Admin Functional Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-4">
            <button className="px-6 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700 transition">
              Manage Students
            </button>
            <button className="px-6 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 transition">
              Manage Teachers
            </button>
            <button className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition">
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
