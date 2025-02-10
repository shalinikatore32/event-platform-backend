// AllEvents.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../../context/EventProvider";

const AllEvents = () => {
  const [events, setEvents] = useState({ live: [], upcoming: [], past: [] });
  const { isLoggedIn } = useEventContext();

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/events/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        categorizeEvents(data);
      } catch (error) {
        console.error("Error fetching all events:", error);
      }
    };

    fetchAllEvents();
  }, []);

  const categorizeEvents = (events) => {
    const now = new Date();
    const live = [];
    const upcoming = [];
    const past = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      if (eventDate.toDateString() === now.toDateString()) {
        live.push(event);
      } else if (eventDate > now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    setEvents({ live, upcoming, past });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">All Events</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => scrollToSection("live-events")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Live Events
        </button>
        <button
          onClick={() => scrollToSection("upcoming-events")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Upcoming Events
        </button>
        <button
          onClick={() => scrollToSection("past-events")}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Past Events
        </button>
      </div>

      <EventSection
        id="live-events"
        title="Live Events"
        events={events.live}
        isLoggedIn={isLoggedIn}
      />
      <EventSection
        id="upcoming-events"
        title="Upcoming Events"
        events={events.upcoming}
        isLoggedIn={isLoggedIn}
      />
      <EventSection
        id="past-events"
        title="Past Events"
        events={events.past}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

const EventSection = ({ id, title, events, isLoggedIn }) => (
  <div id={id} className="mb-12">
    <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  </div>
);

const EventCard = ({ event, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate(`/events/${event._id}`);
    } else {
      alert("Please log in to view event details.");
      // Optionally, redirect to login page
      // navigate('/login');
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={event.image}
          alt={event.name}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="font-bold text-xl text-white">{event.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-base mb-2">{event.description}</p>
        <p className="text-gray-800 text-sm">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-800 text-sm">
          <strong>Time:</strong> {event.startTime} - {event.endTime}
        </p>
        <p className="text-gray-800 text-sm">
          <strong>Category:</strong> {event.category}
        </p>
      </div>
    </div>
  );
};

export default AllEvents;
