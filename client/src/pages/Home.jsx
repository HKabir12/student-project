import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-80   px-4">
      <h1 className="mb-6 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 max-w-2xl">
        Welcome to Smart Student Management System
      </h1>

      <p className="mb-8 text-center text-gray-600 max-w-md">
        Manage students, teachers, and admin panels efficiently.
      </p>

      <Link
        to="/dashboard"
        className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
