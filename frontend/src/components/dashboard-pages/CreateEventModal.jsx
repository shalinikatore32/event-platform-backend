import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { FaImage, FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";
import { useEventContext } from "../../context/EventProvider";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    category: "",
    image: null,
  });

  const navigate = useNavigate();
  const { authorizedToken, user } = useEventContext(); // Ensure this is correctly set

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (acceptedFiles) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key]) {
        eventData.append(key, formData[key], formData[key].name);
      } else {
        eventData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5005/api/create-event", {
        method: "POST",
        headers: {
          Authorization: authorizedToken, // Use the Bearer format
        },
        body: eventData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Event creation failed");
      }

      const data = await response.json();
      console.log("Event created successfully:", data);
      navigate("/dashboard/events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create New Event
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
              <label className="block text-gray-700 font-semibold flex items-center">
                <FaCalendarAlt className="mr-2" /> Date
              </label>
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
              <label className="block text-gray-700 font-semibold flex items-center">
                <FaClock className="mr-2" /> Start Time
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
              <label className="block text-gray-700 font-semibold flex items-center">
                <FaClock className="mr-2" /> End Time
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
              <label className="block text-gray-700 font-semibold flex items-center">
                <FaTag className="mr-2" /> Category
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
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold flex items-center">
              <FaImage className="mr-2" /> Event Image
            </label>
            <Dropzone onDrop={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="w-full p-4 border border-dashed border-gray-300 rounded mt-1 cursor-pointer focus:outline-none focus:border-teal-500 transition duration-300 hover:bg-gray-100"
                >
                  <input {...getInputProps()} />
                  {formData.image ? (
                    <p>{formData.image.name}</p>
                  ) : (
                    <p>Drag 'n' drop an image here, or click to select one</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
