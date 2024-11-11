import Sidenav from "./partials/sidenav"
import Topnav from "./partials/Topnav"
import Header from "./partials/Header"
import { useEffect, useState } from "react"
import axios from "../utils/axios";
import HorizontalCards from "./partials/HorizontalCards";
const Home = ()=>{
    const [wallpaper,setwallpaper] = useState(null)
    const [Trending,setTrending] = useState(null);

    // bringing wallpaper
    const callWallpaper = async () => {
        try {
          const { data } = await axios.get(`/trending/all/day`);
          let randomdata = data.results[(Math.random()*data.results.length).toFixed()];
          setwallpaper(randomdata);
        } catch (e) {
          console.error(e);
        }
      };

      // bringing trending 
      const callTrending = async () => {
        try {
          const { data } = await axios.get(`/trending/all/day`);
          setTrending(data.results);
        } catch (e) {
          console.error(e);
        }
      };

      useEffect(()=>{
        !wallpaper&&callWallpaper();
        !Trending&&callTrending();
      },[])


    return wallpaper && Trending ? (
        <>
        <Sidenav/>
        <div className="w-[80%] h-screen overflow-auto overflow-x-hidden">
            <Topnav/>
            <Header data={wallpaper}/>
            <HorizontalCards data={Trending} />
        </div>
        </>
    ) : <h1 className="text-white">Loading .... </h1>
   
}
export default Home