import React, { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("inside toggle")
    setIsOpen(!isOpen);
  };

  const handle = () => {
    console.log("handlinghggg")
  }

  return (
    <nav onClick={handle} className="bg-white shadow-md p-4 rounded-b-lg font-sans">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        {/* You can replace 'MyWebsite' with your actual logo or site name. */}
        <div className="text-2xl font-bold text-gray-800">Slimify</div>

        {/* Desktop Navigation Links */}
        {/* These links are visible on medium screens and above. */}
        <div className="hidden md:flex space-x-6">
          <Link
            to={`/`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-blue-500"
          >
            Home
          </Link>
          <Link
            to={`/weight-input`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-blue-500"
          >
            Sections
          </Link>
          <Link
            to={`/`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-blue-500"
          >
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        {/* This button is visible only on small screens. */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-2 transition duration-300 ease-in-out"
            aria-label="Toggle menu" // Essential for accessibility
          >
            {/* SVG icon dynamically changes between hamburger and 'X' based on 'isOpen' state */}
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* This menu is hidden by default on small screens and becomes visible when 'isOpen' is true. */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} mt-4`}>
        <div className="flex flex-col space-y-2 px-2 pb-3 sm:px-3">
          <Link
            to={`/`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-blue-500"
          >
            Home
          </Link>
          <Link
            to={`/`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-blue-500"
          >
            Sections
          </Link>
          <Link
            to={`/`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-100 focus:ring-blue-500"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
