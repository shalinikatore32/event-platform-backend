import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const EventContext = createContext();

// Provider component
const EventProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const authorizedToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  const authenticateUser = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5005/api/user`, {
        method: "GET",
        headers: {
          Authorization: authorizedToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5005/events`, {
        method: "GET",
        headers: {
          Authorization: authorizedToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    authenticateUser();
    fetchEvents();
  }, [token]);

  return (
    <EventContext.Provider
      value={{
        isLoggedIn,
        storeToken,
        LogoutUser,
        user,
        events,
        authorizedToken,
        isLoading,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for consuming the context
const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export { EventProvider, useEventContext };
