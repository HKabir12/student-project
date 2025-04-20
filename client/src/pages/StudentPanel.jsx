import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function StudentPanel() {
  const { user } = useAuth();  // Access user data from context

  return (
    <div className="mt-32 text-center px-4 sm:px-6 lg:px-8">
      {!user ? (
        <div>
          <h2 className="text-xl font-bold text-blue-700">Student Panel</h2>
          <p className="mt-2 text-gray-600">
            You are not logged in. Please{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>{" "}
            to access your profile, courses, and results.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-blue-700">Welcome, {user.username}</h2>
          <p className="mt-2 text-gray-600">View your profile, courses, and results here.</p>
          
          <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:flex-row sm:flex-wrap">
            <Link
              to="/student/profile"
              className="block w-full sm:w-auto px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              View Profile
            </Link>
            <Link
              to="/student/courses"
              className="block w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              View Courses
            </Link>
            <Link
              to="/student/results"
              className="block w-full sm:w-auto px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              View Results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
