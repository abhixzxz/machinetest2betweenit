import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: <FaHome className="mr-1" />, text: "Home", path: "/" },
    { icon: <FaInfoCircle className="mr-1" />, text: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-25 md:bg-opacity-5 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-4xl bangers-regular text-red-500 hover:text-red-600 tracking-wide"
          >
            BulletForge
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 bangers-regular text-2xl">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center tracking-wide transition duration-300 ${
                    location.pathname === item.path
                      ? "text-blue-500"
                      : "text-red-500 hover:text-blue-500"
                  }`}
                >
                  {item.icon} {item.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-red-500 hover:text-blue-500 transition duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <RiCloseLine className="w-8 h-8" />
            ) : (
              <RiMenu3Line className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <ul className="pt-2 pb-4 space-y-2 bangers-regular text-xl">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center tracking-wide transition duration-300 py-2 ${
                    location.pathname === item.path
                      ? "text-blue-500"
                      : "text-red-500 hover:text-blue-500"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon} {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
