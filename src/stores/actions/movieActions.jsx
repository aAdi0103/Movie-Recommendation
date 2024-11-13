export { removemovies } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovies } from "../reducers/movieSlice";
export const asyncloadmovies = (id) => async (dispatch, getState) => {
try {
const detail = await axios.get(`/movie/${id}`);

const externalid = await axios.get(`/movie/${id}/external_ids`);

const recommendations = await axios.get(`/movie/${id}/recommendations`);

const similar = await axios.get(`/movie/${id}/similar`);

const videos = await axios.get(`/movie/${id}/videos`);

const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
let theultimatedetails = {
    detail: detail.data,
    externalid: externalid.data,
    recommendations: recommendations.data,
    similar: similar.data,
    videos: videos.data,
    watchproviders: watchproviders.data,
    };
    console.log(theultimatedetails)
} catch (error) {

console.log("Error: ", error);
}
}