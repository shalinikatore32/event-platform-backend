import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold flex items-center space-x-2">
        <span className="hidden md:inline">🎉</span>{" "}
        {/* Optional logo or icon */}
        <span>Organizer Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
        >
          <FaBars className="mr-2" />
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 hidden md:flex items-center">
          <FaBell className="mr-2" />
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 hidden md:flex items-center">
          <FaUserCircle className="mr-2" />
        </button>
      </div>
    </header>
  );
};

export default Header;
