import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import Topnav from './partials/Topnav';
import MoviesCard from './partials/MoviesCard';

const Movies = () => {
  const [Categories, setCategories] = useState('now_playing'); // Default category is 'now_playing'
  const [Movies, setMovies] = useState([]);
  const [Page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const observer = useRef(null);

  // Function to fetch movies from API based on selected category and page
  const callMovies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/movie/${Categories}?page=${Page}`);
      if (data && data.results) {
        setMovies((prev) => [...prev, ...data.results]); // Append new movies to the existing list
      } else {
        console.warn('No results found in the response.');
      }
      setLoading(false);
    } catch (e) {
      console.error('Error fetching data:', e);
      setLoading(false);
    }
  };

  // Fetch movies whenever the category or page changes
  useEffect(() => {
    callMovies();
  }, [Categories, Page]);

  // Handle category change
  const onCategoryChange = (e) => {
    setCategories(e.target.value); // Set the new category
    setMovies([]); // Clear existing data on category change
    setPage(1); // Reset page number
  };

  // Observe the last element for infinite scroll
  const lastElementRef = (node) => {
    if (Loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div className="w-full h-screen p-2">
      <div className="p-6 w-full flex items-center gap-2 max-md:p-2">
        <Link to="/">
          <i className="text-zinc-400 text-2xl max-md:text-xl ri-arrow-left-line"></i>
        </Link>
        <h1 className="text-zinc-400 font-bold text-3xl mb-[6px] max-md:text-xl">Movies</h1>
        <Topnav />
      </div>

      <div className="w-full flex justify-end gap-4 items-center mb-10 ">
        <h1 className="text-zinc-300 font-bold text-xl">Filter : </h1>
        <div className="relative w-[15vw] mr-10 max-md:mr-[30vw]">
          <select
            name="categories"
            id="categories"
            value={Categories}
            onChange={onCategoryChange}
            className="block w-full px-3 py-1 pr-8 text-base text-gray-900 bg-zinc-400 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-md:w-[38vw]"
          >
            <option value="now_playing">Now Playing</option>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      <MoviesCard Movies={Movies} lastElementRef={lastElementRef} title="movie" />
      {Loading && <div className="flex w-full h-screen items-center justify-center min-h-screen bg-gray-800">
    <h1 className="text-white font-bold">Loading ....</h1>
    </div>}
    </div>
  );
};

export default Movies;
