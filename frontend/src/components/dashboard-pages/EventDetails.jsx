import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!event) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            {event.name}
          </h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="mr-2 text-teal-600" />
              <span className="font-semibold">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-2 text-teal-600" />
              <span className="font-semibold">Time:</span> {event.startTime} -{" "}
              {event.endTime}
            </div>
            <div className="flex items-center text-gray-700">
              <FaTag className="mr-2 text-teal-600" />
              <span className="font-semibold">Category:</span> {event.category}
            </div>
          </div>
          <div className="mt-8 flex space-x-4">
            <Link to="/dashboard/events">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Back to Events
              </button>
            </Link>
            <button
              onClick={() => navigate(`/dashboard/event/edit/${event._id}`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Edit Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
