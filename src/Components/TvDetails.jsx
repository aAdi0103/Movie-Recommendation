import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { asyncloadtv, removetvs } from "../stores/actions/TVactions";
const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv); // To bring data
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetvs());
    };
  }, [dispatch, id]);
  return info ? (
    <>
      <div
        className="p-[3%]"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "195vh",
          width: "100vw",
        }}
      >
        <nav className="w-full flex justify-between items-center">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] text-zinc-300 ri-arrow-left-line"
          ></Link>
          <div className="flex gap-9">
            <a
              className="text-zinc-400"
              target="_blank"
              href={info.detail.homepage}
            >
              <i className="ri-external-link-fill"></i>
            </a>
            <a
              target="_blank"
              className="text-zinc-300"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              className="text-yellow-500"
              target="_blank"
              href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
            >
              imdb
            </a>
          </div>
        </nav>

        <div className="w-full flex mt-5 ml-7 gap-[4vw] max-md:ml-2">
          <img
            className="w-[18vw] h-[55vh] object-cover bg-center max-md:w-[35vw] max-md:h-[30vh]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />

          <div>
            <h1 className="text-5xl font-extrabold text-white ml-3 max-md:text-[15px]">
              {info.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}
              <small className="text-xl font-semibold ml-2">
                ({info.detail.first_air_date.split("-")[0]})
              </small>
            </h1>

            <div className="flex items-center gap-3">
              {info.detail.vote_average && (
                <div className="rounded-full ml-3 text-sm font-semibold max-md:w-[6vw] max-md:h-[6vw] bg-yellow-600 text-white w-[7vh] h-[7vh] flex justify-center items-center mt-2 max-md:text-[8px]">
                  {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
                </div>
              )}
              <h1 className="text-zinc-200 text-sm">
                {info.detail.first_air_date},{" "}
              </h1>
              <h1 className="text-zinc-200 text-sm">
                {info.detail.genres && info.detail.genres.length > 0
                  ? info.detail.genres.map((e) => e.name).join(", ")
                  : "No genres available"}
                ,
              </h1>
            </div>
            <h1 className="text-white mt-3 ml-3 italic font-bold">
              {info.detail.tagline}
            </h1>
            <h2 className="ml-3 mt-3 font-bold text-zinc-200">Overview : </h2>
            <p className="text-zinc-200 mt-2 ml-3">{info.detail.overview}</p>
            <Link
              to={`${pathname}/trailer`}
              className="p-3 bg-[#6556CD] w-[13vw] text-white mt-4 ml-3 flex items-center justify-center rounded-md gap-1 max-md:w-[45vw]"
            >
              <i className="text-xl ri-play-line"></i>
              Watch Trailer
            </Link>
          </div>
        </div>

        <div className="mt-5 mb-4">
  <h2 className="text-2xl font-extrabold text-white ml-3">Seasons</h2>
  <div className="flex overflow-x-auto gap-5 mt-5">
    {info.detail.seasons && info.detail.seasons.length > 0 ? (
      info.detail.seasons.map((s, index) => (
        <div
          key={index}
          className="text-white bg-zinc-700 min-w-[18vw] max-md:min-w-[60vw] rounded-lg shadow-lg overflow-hidden mx-3 flex flex-col"
        >
          <div className="flex justify-center items-center w-full h-[30vh]">
            <img
              className="object-cover h-full w-full"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt=""
            />
          </div>
          <div className="p-3">
            <h1 className="text-xl font-extrabold text-white">
              {info.detail.name || s.title || s.original_name || s.original_title}
              <span className="ml-2 text-sm text-zinc-400">Season {s.season_number}</span>
            </h1>
          </div>
        </div>
      ))
    ) : (
      <h3 className="text-zinc-300">No seasons available</h3>
    )}
  </div>
</div>

        {/* Displaying Recommended Movies */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-white ml-3">
            Recommendations and Similar Shows
          </h2>
          <div className="flex overflow-x-auto gap-5 mt-5 pb-5">
            {info.recommendations && info.recommendations.length > 0 ? (
              info.recommendations.map((d, i) => (
                <Link
                  key={i}
                  to={`/${d.media_type || "movie"}/details/${d.id}`}
                >
                  <div className="text-white bg-zinc-700 min-w-[18vw] max-md:min-w-[50vw] h-[55vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
                    <img
                      className="h-[65%] w-full object-cover mb-3"
                      src={`https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.poster_path
                      }`}
                      alt=""
                    />
                    <div className="px-3 pb-3 overflow-hidden">
                      <h1 className="text-lg font-bold text-white overflow-hidden whitespace-normal break-words">
                        {d.name ||
                          d.title ||
                          d.original_name ||
                          d.original_title}
                      </h1>
                      <p className="text-zinc-300 text-xs mt-1">
                        {d.overview.slice(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h3 className="text-zinc-300">No recommendations available</h3>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  ) : (
    <div className="flex w-full h-screen items-center justify-center min-h-screen bg-gray-800">
    <h1 className="text-white font-bold">Loading ....</h1>
    </div>
  );
};
export default TvDetails;
