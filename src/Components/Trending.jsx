import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import Topnav from './partials/Topnav';
import Cards from './partials/Cards';

const Trending = () => {
  const [Categories, setCategories] = useState('all');
  const [Duration, setDuration] = useState('day');
  const [Trending, setTrending] = useState([]);
  const [Page, setPage] = useState(1); // Track current page
  const [Loading, setLoading] = useState(false); // Track loading state
  const observer = useRef(null); // Ref for the observer

  // bringing trending data
  const callTrending = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/trending/${Categories}/${Duration}?page=${Page}`);
      setTrending((prev) => [...prev, ...data.results]); // Append new data
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };


  // Effect to fetch data when category, duration, or page changes
  useEffect(() => {
    callTrending();
  }, [Categories, Duration, Page]); // Dependency on Categories, Duration, and Page


  const onCategoryChange = (e) => {
    setCategories(e.target.value);
    setTrending([]); // Clear existing data on category change
    setPage(1); // Reset page number when category changes
  };

  const onDurationChange = (e) => {
    setDuration(e.target.value);
    setTrending([]); // Clear existing data on duration change
    setPage(1); // Reset page number when duration changes
  };


  // Function to observe when the user has scrolled near the bottom
  const lastElementRef = (node) => {
    if (Loading) return; // Don't observe if data is loading
    if (observer.current) observer.current.disconnect(); // Disconnect previous observer
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1); // Load next page
      }
    });
    if (node) observer.current.observe(node); // Observe the last element in the list
  };

  return (
    <div className="w-full h-screen p-2">

      <div className="p-6 w-full flex items-center gap-2 max-md:p-1">
        <Link to="/">
          <i className="text-zinc-400 text-2xl max-md:text-xl ri-arrow-left-line"></i>
        </Link>
        <h1 className="text-zinc-400 font-bold text-3xl mb-[6px] max-md:text-sm">Trending</h1>
        <Topnav />
      </div>

      <div className="w-full flex justify-end gap-4 items-center mb-10 mr-10 max-md:mt-3 ml-[-70px]">
        <h1 className="text-zinc-300 font-bold text-xl">Filter : </h1> 
        <div className="relative w-[15vw] max-md:mr-6">
          <select
            name="categories"
            id="categories"
            value={Categories}
            onChange={onCategoryChange}
            className="block w-full px-3 py-1 pr-8 text-base text-gray-900 bg-zinc-300 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-md:w-[30vw]"
          >           
            <option value="all">Categories</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>

        <div className="relative w-[15vw] mr-10">
          <select
            name="Duration"
            id="Duration"
            value={Duration}
            onChange={onDurationChange}
            className="block w-full px-3 py-1 pr-8 text-base text-gray-900 bg-zinc-300 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-md:ml-8 max-md:w-[30vw]"
          >
            <option value="duration">Duration</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
          </select>
        </div>
      </div>

      <Cards Trending={Trending} lastElementRef={lastElementRef} />
      {Loading && <div className="flex w-full h-screen items-center justify-center min-h-screen bg-gray-800">
    <h1 className="text-white font-bold">Loading ....</h1>
    </div>}
    </div>
  );
};

export default Trending;
