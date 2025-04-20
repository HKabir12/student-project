import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function TeacherPanel() {
  const { user } = useAuth(); // Assuming you're using the Auth context for user data
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  const handleLogin = () => {
    // Logic for teacher login (maybe using context or redirect)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logout logic here (clear token, redirect, etc)
    setIsLoggedIn(false);
  };

  return (
    <div className="mt-32 text-center">
      <h2 className="text-xl font-bold text-blue-700">Teacher Panel</h2>
      <p className="mt-2 text-gray-600">Manage student grades, attendance, and content.</p>

      {/* Teacher Login Section */}
      {!isLoggedIn ? (
        <div className="mt-6">
          <h3 className="text-lg text-gray-700">Teacher Login</h3>
          <p className="mt-2 text-gray-500">Please log in to manage content and grades.</p>
          <button
            onClick={handleLogin}
            className="mt-4 px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Login as Teacher
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg text-gray-700">Welcome, Teacher!</h3>
          <p className="mt-2 text-gray-500">You can now manage grades and student data.</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}

      {/* Optional Links to Features */}
      <div className="mt-8">
        <Link
          to="/grades"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Manage Grades
        </Link>
        <Link
          to="/attendance"
          className="px-4 py-2 ml-4 text-white bg-yellow-600 rounded hover:bg-yellow-700"
        >
          Manage Attendance
        </Link>
        <Link
          to="/content"
          className="px-4 py-2 ml-4 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Manage Content
        </Link>
      </div>
    </div>
  );
}
