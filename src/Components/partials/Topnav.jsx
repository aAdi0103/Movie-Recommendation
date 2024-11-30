import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const Topnav = () => {
  const [query, setquery] = useState(""); // to keep data of input 
  const [Searches, setSearches] = useState([]); // to keep data of searches 

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      getSearches();
    } else {
      setSearches([]); 
    }
  }, [query]);


  const defaultImageUrl = "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"; 

  return (
    <div className="w-full h-[10vh] max-md:h-[8vh] relative flex justify-center items-center mt-[5px]">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        className="w-[50%] max-md:w-[80%] text-zinc-200 mx-7 max-md:mx-2 p-3 rounded-md text-xl bg-zinc-700 outline-none border-none bg-transparent"
        type="text"
        onChange={(e) => setquery(e.target.value)}
        placeholder="search anything"
        value={query}
      />

      {

      query.length > 0 && (
        <i
          className="text-zinc-400 text-3xl ri-close-fill cursor-pointer"
          onClick={() => setquery("")}
        ></i>
      )
      
      }

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto">
        {Searches.map((s, i) => (
          <Link to={`/${s.media_type || title }/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 p-5 flex justify-start items-center border-b-2 border-zinc-100 gap-5"
          >
            <img
              className="w-[5vw] h-[5vw] rounded-md"
              src={`https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path || ""
              }`}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImageUrl;
              }}
            />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>
        ))}
      </div>

    </div>
  );
};
export default Topnav;
