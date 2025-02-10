// EventDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../../context/EventProvider";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const { isLoggedIn } = useEventContext();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/events/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetail();
  }, [id]);

  const handleRegister = () => {
    if (isLoggedIn) {
      // Implement registration logic here
      alert("Registered for the event!");
    } else {
      alert("Please log in to register for the event.");
      // Optionally, redirect to login page
      navigate("/signin");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
      <img
        className="w-full h-64 object-cover mb-4"
        src={event.image}
        alt={event.name}
      />
      <p className="text-gray-600 text-lg mb-4">{event.description}</p>
      <p className="text-gray-800 text-sm mb-2">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-800 text-sm mb-2">
        <strong>Time:</strong> {event.startTime} - {event.endTime}
      </p>
      <p className="text-gray-800 text-sm mb-4">
        <strong>Category:</strong> {event.category}
      </p>
      {isLoggedIn ? (
        <button
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Register for Event
        </button>
      ) : (
        <div>
          <p className="text-red-500 mb-4">
            You must be logged in to register for this event.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
