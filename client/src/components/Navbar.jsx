import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Admin
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/student"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-green-600 font-bold" : ""
          }
        >
          Student
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teacher"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-purple-600 font-bold" : ""
          }
        >
          Teacher
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="top-0 left-0 z-50 w-full bg-white shadow-md">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 px-4 sm:px-6 py-3">
        <div className="sm:w-1/3 mx-auto text-center">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
            Smart Student Management
          </h1>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex flex-wrap justify-center gap-3 px-4 py-3 border-t">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="sm:hidden border-t px-4 py-3 flex justify-start relative">
        <button onClick={toggleMenu} className="btn btn-ghost m-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            className="menu menu-sm absolute top-14 left-2 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
          >
            {links}
          </ul>
        )}
      </div>
    </div>
  );
}
