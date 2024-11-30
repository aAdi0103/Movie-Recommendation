import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { asyncloadpersons, removeperson } from "../stores/actions/PersonAction";
import HorizontalCards from "./partials/HorizontalCards";
const PeopleDetails = () =>{
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadpersons(id));

    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);
  return info ? (
    <>
      <div className="p-[3%] max-md:p-3 w-screen flex flex-col h-[150vh]" > 
      <nav className="w-full flex justify-between items-center">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] text-zinc-300 ri-arrow-left-line"
          ></Link>

        </nav>

        <div className="w-full flex gap-20 max-md:gap-3">
  {/* Part 2 left Poster and Details */}
  <div className="w-[20%] ml-16 mt-2 max-md:w-[40vw] max-md:ml-1">
    <img
      className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] w-[15vw] object-cover max-md:w-full"
      src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
      alt="Poster"
    />
    <hr className="mt-3 mb-3 border-none h-[2px] bg-zinc-500" />
    <div className="flex gap-9 max-md:gap-2 max-md:text-sm">
            <a
              target="_blank"
              className="text-zinc-300 text-xl"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              className="text-zinc-300 text-xl"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              className="text-zinc-300 text-xl"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              className="text-zinc-300 text-xl"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>

          <h1 className="text-2xl font-bold text-zinc-100 mt-2 max-md:text-[17px]">Person Info</h1>
          <h1 className="text-lg text-zinc-400 font-semibold max-md:text-[15px]">
  Known For
</h1>
<h1 className="text-zinc-400">
  {info.detail.known_for_department}
</h1>

<h1 className="text-lg text-zinc-400 font-semibold mt-3 max-md:text-[15px]">
  Gender
</h1>
<h1 className="text-zinc-400">
  {info.detail.gender === 2 ? "Male" : "Female"}
</h1>
<h1 className="text-lg text-zinc-400 font-semibold mt-3 max-md:text-[15px]">
  Birthday
</h1>
<h1 className="text-zinc-400">
  {info.detail.birthday}
</h1>
<h1 className="text-lg text-zinc-400 font-semibold mt-3 max-md:text-[15px]">
  Deathday
</h1>
<h1 className="text-zinc-400">
  {info.detail.deathday?info.detail.deathday:"Alive"}
</h1>
<h1 className="text-lg text-zinc-400 font-semibold mt-3 max-md:text-[15px]">
  Place of Birth
</h1>
<h1 className="text-zinc-400">
  {info.detail.place_of_birth}
</h1>

  </div>

  {/* Part 3 right Details and information */}
  <div className="w-[80%] max-md:w-[40vw] max-md:relative">
    <h1 className="text-5xl font-bold text-zinc-100 mt-2 max-md:text-xl ">{info.detail.name}</h1>
    <h1 className="text-xl text-zinc-400 font-semibold mt-5 max-md:mt-2">
     Biography
</h1>
<h1 className="text-zinc-400 mt-2 text-sm max-md:text-[14px]">
  {info.detail.biography}
</h1>
<h1 className="mt-3 text-zinc-200 font-bold text-2xl">Known For</h1>
<div className="mt-5 mb-4 max-md:w-full">
  <h2 className="text-sm font-semibold text-white ml-3">Movies & Shows</h2>
  <div className="flex overflow-x-auto gap-5 mt-5">
    {info.combinedCredits && info.combinedCredits.cast.length > 0 ? (
      info.combinedCredits.cast.map((castItem, index) => (
        <div
          key={index}
          className="text-white bg-zinc-700 min-w-[18vw] max-md:min-w-[50vw] h-[50vh] rounded-lg shadow-lg overflow-hidden mx-3"
        >
          {/* Movie or Show Poster */}
          <img
            className="h-[30vh] w-full object-cover mx-auto mt-0 mb-5"
            src={`https://image.tmdb.org/t/p/original/${castItem.poster_path || castItem.profile_path}`}
            alt={castItem.title || castItem.name}
          />
          {/* Movie or Show Title */}
          <h1 className="text-xl font-extrabold text-white ml-3">
            {castItem.title || castItem.name}
          </h1>
          {/* Character Name in Movie/Show */}
          <h2 className="text-sm text-zinc-300 ml-3 mt-1">
            {castItem.character || 'Character not available'}
          </h2>
        </div>
      ))
    ) : (
      <h3 className="text-zinc-300">No movies or shows available</h3>
    )}
  </div>
</div>

  </div>
</div>



      </div>
    </>
  ) : (
    <div className="flex w-full h-screen items-center justify-center min-h-screen bg-gray-800">
    <h1 className="text-white font-bold">Loading ....</h1>
    </div>
  );
 }
 export default PeopleDetails;