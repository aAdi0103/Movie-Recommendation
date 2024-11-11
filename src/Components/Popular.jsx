import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import Topnav from './partials/Topnav';
import Cards from './partials/Cards';

const Popular = () => {
  const [Categories, setCategories] = useState('all');
  const [Duration, setDuration] = useState('day');
  const [Popular, setPopular] = useState([]); // State to hold Popular data
  const [Page, setPage] = useState(1); // Track current page
  const [Loading, setLoading] = useState(false); // Track loading state
  const observer = useRef(null); // Ref for the observer

  // Fetch popular data from API
  const callPopular = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/popular/${Categories}/${Duration}?page=${Page}`);
      setPopular((prev) => [...prev, ...data.results]); // Append new data to existing popular list
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
console.log(Popular)
  // Fetch popular data whenever categories, duration, or page changes
  useEffect(() => {
    callPopular();
  }, [Categories, Duration, Page]);

  // Handle category change
  const onCategoryChange = (e) => {
    setCategories(e.target.value);
    setPopular([]); // Clear existing data on category change
    setPage(1); // Reset page number
  };

  // Handle duration change
  const onDurationChange = (e) => {
    setDuration(e.target.value);
    setPopular([]); // Clear existing data on duration change
    setPage(1); // Reset page number
  };

  // Observe the last element for infinite scroll
  const lastElementRef = (node) => {
    if (Loading) return; // Skip if loading
    if (observer.current) observer.current.disconnect(); // Disconnect previous observer

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1); // Trigger next page load
      }
    });

    if (node) observer.current.observe(node); // Start observing the last element
  };

  return (
    <div className="w-full h-screen p-2">
      <div className="p-6 w-full flex items-center gap-2">
        <Link to="/">
          <i className="text-zinc-400 text-2xl ri-arrow-left-line"></i>
        </Link>
        <h1 className="text-zinc-400 font-bold text-3xl mb-[6px]">Popular</h1>
        <Topnav />
      </div>

      <div className="w-full flex justify-end gap-4 items-center mb-10">
        <h1 className="text-zinc-400">Sort: </h1>

        <div className="relative w-[15vw]">
          <select
            name="categories"
            id="categories"
            value={Categories}
            onChange={onCategoryChange}
            className="block w-full px-1 py-1 pr-8 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Categories</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>

        <div className="relative w-[15vw]">
          <select
            name="duration"
            id="duration"
            value={Duration}
            onChange={onDurationChange}
            className="block w-full px-1 py-1 pr-8 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
          </select>
        </div>
      </div>

      {/* Pass Popular data and last element ref to Cards */}
      <Cards Trending={Popular} lastElementRef={lastElementRef} />
      {Loading && <p className="text-center text-white">Loading...</p>}
    </div>
  );
};

export default Popular;
