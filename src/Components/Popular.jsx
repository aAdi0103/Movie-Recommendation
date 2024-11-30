import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import Topnav from './partials/Topnav';
import PopularCards from './partials/PopularCards';

const Popular = () => {
  const [Categories, setCategories] = useState('movie');
  const [Popular, setPopular] = useState([]); 
  const [Page, setPage] = useState(1); // Track current page
  const [Loading, setLoading] = useState(false); // Track loading state
  const observer = useRef(null); // Ref for the observer

  // Fetch popular data from API
  const callPopular = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Categories}/popular?page=${Page}`);
      if (data && data.results) {
        setPopular((prev) => [...prev, ...data.results]);
      } else {
        console.warn('No results found in the response.');
      }
      setLoading(false);
    } catch (e) {
      console.error('Error fetching data:', e);
      setLoading(false);
    }
  };
  
  // Fetch popular data whenever categories, duration, or page changes
  useEffect(() => {
    callPopular();
  }, [Categories, Page]);

  // Handle category change
  const onCategoryChange = (e) => {
    setCategories(e.target.value);
    setPopular([]); // Clear existing data on category change
    setPage(1); // Reset page number
  };

  // Handle duration change
  const onDurationChange = (e) => {
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
      <div className="p-6 w-full flex items-center gap-2 max-md:p-2">
        <Link to="/">
          <i className="text-zinc-400 text-2xl ri-arrow-left-line"></i>
        </Link>
        <h1 className="text-zinc-400 font-bold text-3xl mb-[6px] max-md:text-[14px]">Popular</h1>
        <Topnav />
      </div>

      <div className="w-full flex justify-end gap-4 items-center mb-10">
        <h1 className="text-zinc-300 font-bold text-xl">Filter : </h1>

        <div className="relative w-[15vw] mr-10 max-md:mr-[30vw]">
          <select
            name="categories"
            id="categories"
            value={Categories}
            onChange={onCategoryChange}
            className="block w-full px-3 py-1 pr-8 text-base text-gray-900 bg-zinc-300 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-md:w-[35vw]"
          >
            <option value="all">Categories</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>
      </div>

      <PopularCards Popular={Popular} lastElementRef={lastElementRef} title={Categories} />
      {Loading && <div className="flex w-full h-screen items-center justify-center min-h-screen bg-gray-800">
    <h1 className="text-white font-bold">Loading ....</h1>
    </div>}
    </div>
  );
};

export default Popular;
