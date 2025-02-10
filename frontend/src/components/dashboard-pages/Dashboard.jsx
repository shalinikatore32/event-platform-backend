import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
          <button
            onClick={openModal}
            className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
          >
            <Link to="/dashboard/create-event">Create Event</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
