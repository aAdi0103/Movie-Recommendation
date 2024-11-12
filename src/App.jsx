import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movies from './Components/Movies'
import Tvshows from './Components/Tvshows'
import People from './Components/People'
import MovieDetails from './Components/movieDetails'
import TvDetails from './Components/tvDetails'
import PeopleDetails from './Components/peopleDetails'

function App() {

  return (
    <>
      <div className='w-screen h-screen bg-[#1F1E24] flex overflow-x-hidden'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/trending" element={<Trending/>}/>
          <Route path="/popular" element={<Popular/>}/>
          <Route path="/movie" element={<Movies/>}/>  
          <Route path="/movie/details/:id" element={<MovieDetails/>}/> 
          <Route path="/tv" element={<Tvshows/>}/>
          <Route path="/tv/details/:id" element={<TvDetails/>}/>  
          <Route path="/peoples" element={<People/>}/>
          <Route path="/peoples/details/:id" element={<PeopleDetails/>}/>    
        </Routes>
      </div>
    </>
  )
}

export default App
