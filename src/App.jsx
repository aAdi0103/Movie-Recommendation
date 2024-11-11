import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
function App() {

  return (
    <>
      <div className='w-screen h-screen bg-[#1F1E24] flex overflow-x-hidden'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/trending" element={<Trending/>}/>
          <Route path="/popular" element={Popular}/>
        </Routes>
      </div>
    </>
  )
}

export default App
