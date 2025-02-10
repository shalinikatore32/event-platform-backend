// PublicEvents.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleViewMoreClick = () => {
    navigate("/events/all");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
            onClick={() => handleCardClick(event._id)}
          >
            <img
              className="w-full h-48 object-cover"
              src={event.image}
              alt={event.name}
            />
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2 text-gray-800">
                {event.name}
              </h3>
              <p className="text-gray-600 text-base">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewMoreClick}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          View More Events
        </button>
      </div>
    </div>
  );
};

export default PublicEvents;
