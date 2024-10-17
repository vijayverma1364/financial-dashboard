'use client';
import React, { useState } from 'react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 md:px-8 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <img
          src="https://img.icons8.com/?size=100&id=z7e0tPSC7IAj&format=png&color=000000"
          alt="Logo"
          className="h-10 w-10 mr-3 rounded-full"
        />
        <span className="text-white text-xl font-semibold">Financial Dashboard</span>
      </div>

      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
