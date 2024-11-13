import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { asyncloadmovies } from '../stores/actions/movieActions';
const MovieDetails = () =>{
   const {id}= useParams();
   const dispatch = useDispatch();
   useEffect(()=>{
      dispatch(asyncloadmovies(id));
   },[])
   return (
    <>
    <h1>Helllo</h1>
    </>
   )
}
export default MovieDetails;