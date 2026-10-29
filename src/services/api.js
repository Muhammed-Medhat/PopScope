import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { language: "en-US" },
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
});
export default api;
