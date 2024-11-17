import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import Topnav from './partials/Topnav';
import PeopleCards from './partials/PeopleCards';

const People = () => {
  const [Categories, setCategories] = useState('popular');
  const [People, setPeople] = useState([]); 
  const [Page, setPage] = useState(1); // Track current page
  const [Loading, setLoading] = useState(false); // Track loading state
  const observer = useRef(null); // Ref for the observer

  // Fetch People data from API
  const callPeople = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/person/${Categories}?page=${Page}`);
      if (data && data.results) {
        setPeople((prev) => [...prev, ...data.results]);
      } else {
        console.warn('No results found in the response.');
      }
      setLoading(false);
    } catch (e) {
      console.error('Error fetching data:', e);
      setLoading(false);
    }
  };
  // Fetch People data whenever categories, duration, or page changes
  useEffect(() => {
    callPeople();
  }, [Categories, Page]);

  // Handle category change
  const onCategoryChange = (e) => {
    setCategories(e.target.value);
    setPeople([]); // Clear existing data on category change
    setPage(1); // Reset page number
  };

  // Handle duration change
  const onDurationChange = (e) => {
    setPeople([]); // Clear existing data on duration change
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
        <h1 className="text-zinc-400 font-bold text-3xl mb-[6px]">People</h1>
        <Topnav />
      </div>

      <PeopleCards People={People} lastElementRef={lastElementRef} title="person" />
      {Loading && <div className="flex w-full h-screen items-center justify-center min-h-screen bg-gray-800">
    <h1 className="text-white font-bold">Loading ....</h1>
    </div>}
    </div>
  );
};

export default People;
