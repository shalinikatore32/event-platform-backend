import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaTag, FaUsers } from "react-icons/fa";
import { useEventContext } from "../../context/EventProvider"; // Assuming you have a context for authentication

const EventDashboard = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [events, setEvents] = useState({ live: [], upcoming: [], past: [] });
  const [attendees, setAttendees] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authorizedToken } = useEventContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/my-events", {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [authorizedToken]);

  useEffect(() => {
    // Simulate real-time updates for attendees
    const interval = setInterval(() => {
      const updatedAttendees = {};
      Object.values(events)
        .flat()
        .forEach((event) => {
          updatedAttendees[event._id] = Math.floor(Math.random() * 100); // Random number of attendees
        });
      setAttendees(updatedAttendees);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [events]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  const renderEvents = (status) => {
    return events[status].map((event) => (
      <div
        key={event._id}
        className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
      >
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            {event.name}
          </h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <FaTag className="mr-2" />
            <span>{event.category}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaUsers className="mr-2" />
            <span>{attendees[event._id] || 0} Attendees</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-8 text-center">
        Event Dashboard
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("live")}
          className={`py-2 px-6 rounded-full font-bold transition duration-300 ${
            activeTab === "live"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-indigo-600 border border-indigo-600"
          }`}
        >
          Live Events
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-2 px-6 rounded-full font-bold transition duration-300 ${
            activeTab === "upcoming"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-indigo-600 border border-indigo-600"
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`py-2 px-6 rounded-full font-bold transition duration-300 ${
            activeTab === "past"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-indigo-600 border border-indigo-600"
          }`}
        >
          Past Events
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {renderEvents(activeTab)}
      </div>
    </div>
  );
};

export default EventDashboard;
