import React from "react";

const Dropdown = ({ onSelectChange }) => {
  return (
    <div className="w-full max-w-xs">
      <label htmlFor="format" className="block mb-2 text-sm font-medium text-gray-700">
        Filter by:
      </label>
      <div className="relative">
        <select
          name="format"
          id="format"
          onChange={(e) => onSelectChange(e.target.value)}
          className="block w-full px-1 py-1 pr-8 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
