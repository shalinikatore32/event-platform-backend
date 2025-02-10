import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      toast.success("User registered successfully");
      console.log("User registered successfully:", data);
      navigate("/signin");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="text-center p-6">
          <h1 className="text-5xl font-bold text-white mb-4">EventPro</h1>
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-white mb-6">
            Sign up to access exclusive events and connect with like-minded
            individuals on EventPro.
          </p>
          <img
            src="https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Community"
            className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account on EventPro
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
              >
                <option value="attendee">attendee</option>
                <option value="organizer">organizer</option>
                <option value="guest">guest</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
