import React from 'react';
import { FiPower } from 'react-icons/fi';

function Header() {
  return (
    <header className="bg-blue-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-white text-center text-2xl font-bold uppercase">
          BOOK MANAGEMENT SYSTEM
        </h1>
        <button className="text-white hover:text-gray-200">
          <FiPower size={20}  />
        </button>
      </div>
    </header>
  );
}

export default Header;
