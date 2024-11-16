import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <>
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] text-zinc-300 ri-arrow-left-line fixed top-5 left-5 z-[200]" 
      >
      </Link>
      
      <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
        <ReactPlayer
        controls
          height={450}
          width={1100}
          url={`https://www.youtube.com/watch?v=${ytvideo?.key}`} // Corrected URL syntax
        />
      </div>
    </>
  );
};

export default Trailer;
