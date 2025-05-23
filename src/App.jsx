import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movies from './Components/Movies'
import Tvshows from './Components/Tvshows'
import People from './Components/People'
import MovieDetails from './Components/MovieDetails'
import TvDetails from './Components/TvDetails'
import PeopleDetails from './Components/PeopleDetails'
import Trailer from './Components/partials/Trailer'

function App() {

  return (
    <>
      <div className='w-screen h-screen bg-[#1F1E24] flex overflow-x-hidden'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/trending" element={<Trending/>}/>
          <Route path="/popular" element={<Popular/>}/>
          <Route path="/movie" element={<Movies/>}/>  
          <Route path="/movie/details/:id" element={<MovieDetails/>}>
          <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
          </Route> 
          <Route path="/tv" element={<Tvshows/>}/>
          <Route path="/tv/details/:id" element={<TvDetails/>}>
          <Route path="/tv/details/:id/trailer" element={<Trailer/>} />

          </Route>  
          <Route path="/peoples" element={<People/>}/> 
          <Route path="/person/details/:id" element={<PeopleDetails/>}/>    
        </Routes>
      </div>
    </>
  )
}

export default App
