import React from "react";

const Dropdown = ({ onSelectChange }) => {
  return (
    <div className="w-full max-w-xs">
      <div className="relative">
        <select
          name="format"
          id="format"
          onChange={(e) => onSelectChange(e.target.value)}
          className="block w-full px-1 py-1 pr-8 text-base text-gray-900 bg-zinc-300 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <i className="ri-arrow-down-wide-line text-gray-600 text-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
