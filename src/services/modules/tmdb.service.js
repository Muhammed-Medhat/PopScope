import api from "../api";
import { ENDPOINTS } from "../endpoints";

export const tmdbService = {
  getTrending: (page) => api.get(ENDPOINTS.TRENDING(page)),
  getMovieDetails: (id, signal) =>
    api.get(ENDPOINTS.MOVIEDETAILS(id), { signal }),
  getMovieVideo: (id, signal) => api.get(ENDPOINTS.MOVIEVIDEO(id), { signal }),
  getMovieBySearch: (query, signal) =>
    api.get(ENDPOINTS.MOVIESEARCH(query), { signal }),
};
