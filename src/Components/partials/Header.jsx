import React from "react";
import { Link } from "react-router-dom";
const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center center", 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat", 
      }}
      className="w-full h-[60vh] mt-1 p-[5%] flex flex-col justify-end"
    >
      <h1 className="text-4xl font-extrabold text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="text-zinc-300">
        {data.overview.slice(0, 300)}
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400 ml-3">more ...</Link>
      </p>
      <p className="text-white mt-1">
        <i class="text-yellow-400 ri-megaphone-fill"></i>{" "}
        {data.first_air_date || data.release_date}
        <span className="ml-5">
          <i class="mr-1 text-yellow-300 ri-play-fill"></i>
          {data.media_type}
        </span>
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-3 bg-[#6556CD] w-[10vw] text-white mt-2 flex items-center justify-center rounded-md max-md:w-[60%]">
        Watch Trailer
      </Link>
    </div>
  );
};
export default Header;
