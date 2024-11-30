import { Link } from "react-router-dom";
const Sidenav = () => {
  return (
    <>
      <div className="w-[20%] max-md:w-[25%] max-md:p-2 h-full border-r-2 border-zinc-400 p-5 overflow-x-hidden">
        <h1 className="text-2x1 text-white font-bold max-md:text-sm max-md:mt-5">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span className="text-2x1 max-md:text-sm text-white">SCSDB.</span>
        </h1>
        <nav className="flex flex-col text-x1 gap-2 max-md:gap-1 max-md:mt-[-10px]">
          <h1 className="text-white font-semibold text-xl mt-8 mb-2 max-md:text-[12px] max-md:mb-3">
            New Feeds
          </h1>

          <Link
            to="/trending"
            className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 max-md:p-1 max-md:mb-2 "
          >
            <i class="ri-fire-fill"></i> Trending
          </Link>
          <Link to="/popular" className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 max-md:p-1 max-md:mb-2 ">
            <i class="ri-bard-fill"></i> Popular
          </Link>
          <Link to="/movie" className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 max-md:mb-2 max-md:p-1">
            <i class="ri-movie-2-fill"></i> Movies
          </Link>
          <Link to="tv" className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 max-md:p-1 max-md:mb-2 ">
            <i class="ri-tv-fill"></i> Tv Shows
          </Link>
          <Link to="peoples" className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 mb-3 max-md:p-1 max-md:mb-5 ">
            <i class="ri-group-fill"></i> People
          </Link>
        </nav>
        <hr />
        <nav className="flex flex-col text-x1 gap-2">
          <h1 className="text-white font-semibold text-xl mt-6 mb-2 max-md:text-[12px] max-md:mt-3 max-md:font-normal">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 max-md:p-1">
            <i class="ri-info-i"></i> About
          </Link>
          <Link className="hover:bg-[#6556CD] Thover: text-zinc-300 duration-300 rounded-md p-3 max-md:p-1">
            <i class="ri-phone-line"></i> Contact
          </Link>
        </nav>
      </div>
    </>
  );
};
export default Sidenav;
