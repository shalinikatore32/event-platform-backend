import React from "react";
import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaChartLine,
  FaSignOutAlt, // Import the new icon
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for small screens only */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`bg-gradient-to-b from-purple-600 to-indigo-600 text-white w-64 space-y-6 py-7 px-2 transform lg:translate-x-0 fixed lg:relative h-full transition-transform duration-300 ease-in-out shadow-lg z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">EventPro</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="mt-10">
          <Link
            to="/dashboard"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700"
          >
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </Link>
          <Link
            to={`/dashboard/events`}
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700"
          >
            <FaCalendarAlt className="mr-3" />
            Events
          </Link>
          <Link
            to="/dashboard/analytics"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700"
          >
            <FaChartLine className="mr-3" />
            Analytics
          </Link>
          <Link
            to="/logout"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700"
          >
            <FaSignOutAlt className="mr-3" /> {/* Use the new icon here */}
            Logout
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
