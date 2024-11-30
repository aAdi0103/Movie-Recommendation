import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import Topnav from './partials/Topnav';
import TvshowsCard from './partials/TvshowsCard';

const Tvshows = () => {
  const [Categories, setCategories] = useState('airing_today');
  const [Tvshows, setTvshows] = useState([]); 
  const [Page, setPage] = useState(1); // Track current page
  const [Loading, setLoading] = useState(false); // Track loading state
  const observer = useRef(null); // Ref for the observer

  // Fetch Tvshows data from API
  const callTvshows = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tv/${Categories}?page=${Page}`);
      if (data && data.results) {
        setTvshows((prev) => [...prev, ...data.results]);
      } else {
        console.warn('No results found in the response.');
      }
      setLoading(false);
    } catch (e) {
      console.error('Error fetching data:', e);
      setLoading(false);
    }
  };
  
  // Fetch Tvshows data whenever categories, duration, or page changes
  useEffect(() => {
    callTvshows();
  }, [Categories, Page]);

  // Handle category change
  const onCategoryChange = (e) => {
    setCategories(e.target.value);
    setTvshows([]); // Clear existing data on category change
    setPage(1); // Reset page number
  };

  // Handle duration change
  const onDurationChange = (e) => {
    setTvshows([]); // Clear existing data on duration change
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
          <i className="text-zinc-400 text-2xl max-md:text-xl ri-arrow-left-line"></i>
        </Link>
        <h1 className="text-zinc-400 font-bold text-3xl mb-[6px] max-md:text-xl">Tvshows</h1>
        <Topnav />
      </div>

      <div className="w-full flex justify-end gap-4 items-center mb-10">
        <h1 className="text-zinc-300 font-bold text-xl">Filter : </h1>

        <div className="relative w-[15vw] p-1 mr-10 max-md:mr-[30vw]">
          <select
            name="categories"
            id="categories"
            value={Categories}
            onChange={onCategoryChange}
            className="block w-full px-3 py-1 pr-8 text-base text-gray-900 bg-zinc-300 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-md:w-[39vw]"
          >
            <option value="on_the_air">On_the_air</option>
            <option value="popular">Popular</option>
            <option value="top_rated">Top_Rated</option>
            <option value="airing_today">Airing_today</option>
          </select>
        </div>
      </div>

      <TvshowsCard Tvshows={Tvshows} lastElementRef={lastElementRef} title="tv" />
      {Loading && <p className="text-center text-white">Loading...</p>}
    </div>
  );
};

export default Tvshows;
