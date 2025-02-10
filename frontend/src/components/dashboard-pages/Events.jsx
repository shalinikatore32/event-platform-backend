import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEventContext } from "../../context/EventProvider";

const Events = () => {
  const [events, setEvents] = useState({ live: [], upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authorizedToken } = useEventContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/my-events", {
          method: "GET",
          headers: {
            Authorization: authorizedToken, // Ensure Bearer format
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Ensure this matches the structure of your response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [authorizedToken]);

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

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-600">
        My Events
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(events).map((category) =>
          events[category].map((event) => (
            <div
              key={event._id} // Use _id if MongoDB is used
              className="bg-white rounded-xl shadow-lg overflow-hidden transition transform duration-300 hover:scale-105 hover:shadow-xl"
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
                <p className="text-gray-600">{event.description}</p>
                <p className="mt-4 text-gray-500">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <Link to={`/dashboard/event/${event._id}`}>
                  <button className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
