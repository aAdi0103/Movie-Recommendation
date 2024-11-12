import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
    info: null,
  };

  export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
     loadpeoples:(state,action) =>{
        state.info = action.payload;
     },
     removepeoples:(state,action) =>{
               state.info = null
     }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { loadpeoples,removepeoples} = peopleSlice.actions
  
  export default peopleSlice.reducer