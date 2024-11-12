import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
    info: null,
  };

  export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
     loadmovies:(state,action) =>{
        state.info = action.payload;
     },
     removemovies:(state,action) =>{
               state.info = null
     }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { loadmovies,removemovies} = movieSlice.actions
  
  export default movieSlice.reducer