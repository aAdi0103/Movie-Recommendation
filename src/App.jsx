import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
function App() {

  return (
    <>
      <div className='w-screen h-screen bg-[#1F1E24] flex overflow-x-hidden'>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
