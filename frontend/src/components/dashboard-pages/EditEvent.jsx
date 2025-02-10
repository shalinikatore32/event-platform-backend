import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../../context/EventProvider";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authorizedToken } = useEventContext();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setFormData({
          ...data,
          date: new Date(data.date).toISOString().split("T")[0], // Format date for input
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5005/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizedToken,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Event update failed");
      }

      const data = await response.json();
      console.log("Event updated successfully:", data);
      navigate(`/dashboard/event/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Edit Event
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
