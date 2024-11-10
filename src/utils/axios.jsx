import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjhhNmZlZGQ3YTNlYTIyZDc0YjViNDhmYmMzNzBlMSIsIm5iZiI6MTczMTI0MTgyOC45MDI2MzE1LCJzdWIiOiI2NzMwOWNlYzQ5YWQ1YWZlZmMzMDJkMGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5ZucURNfkQxOqLfz6G_ArKJwX_jGM5zP40rdD_-J4Ls'
      }

})
export default instance;