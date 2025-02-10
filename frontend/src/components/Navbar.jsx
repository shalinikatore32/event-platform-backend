import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">EventPro</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="hover:text-yellow-300 transition-colors duration-300 font-semibold"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="relative hidden md:flex space-x-4">
          <Link
            to="/signin"
            className="text-white hover:text-yellow-300 transition-colors duration-300 font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:text-yellow-300 transition-colors duration-300 font-semibold"
          >
            Signup
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 to-blue-600 text-white">
          <nav className="flex flex-col space-y-2 p-4">
            {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="hover:text-yellow-300 transition-colors duration-300 font-semibold"
              >
                {item}
              </Link>
            ))}
            <Link
              to="/signin"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-semibold"
            >
              Signup
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
