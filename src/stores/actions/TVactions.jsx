export { removetvs } from "../reducers/tvSlices";
import axios from "../../utils/axios";
import { loadtvs } from "../reducers/tvSlices";
export const asyncloadtv = (id) => async (dispatch, getState) => {
try {
const detail = await axios.get(`/tv/${id}`);

const externalid = await axios.get(`/tv/${id}/external_ids`);

const recommendations = await axios.get(`/tv/${id}/recommendations`);

const similar = await axios.get(`/tv/${id}/similar`);

const translations = await axios.get(`/tv/${id}/translations`);

const videos = await axios.get(`/tv/${id}/videos`);

const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
let theultimatedetails = {
    detail: detail.data,
    externalid: externalid.data,
    recommendations: recommendations.data.results,
    translations:translations.data.translations.map((e)=>e.english_name),
    similar: similar.data.results,
    videos: videos.data.results.find((e) => e.type === "Trailer"),
    watchproviders: watchproviders.data,
    };
    dispatch(loadtvs(theultimatedetails));
} catch (error) {

console.log("Error: ", error);
}
}