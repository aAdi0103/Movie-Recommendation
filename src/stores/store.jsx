import { configureStore } from "@reduxjs/toolkit";
import movieReducers from "./reducers/movieSlice";
import tvReducers from "./reducers/tvSlices";
import peopleReducers from "./reducers/peopleSlice";

export default configureStore({
  reducer: {
    movie: movieReducers,
    tv: tvReducers,
    person: peopleReducers,
  },
});
