export const ENDPOINTS = {
  TRENDING: (page) => `/trending/movie/week?page=${page}`,
  MOVIEDETAILS: (id) => `/movie/${id}?append_to_response=credits`,
  MOVIEVIDEO: (id) => `/movie/${id}/videos`,
  MOVIESEARCH: (query) => `/search/movie?query=${query}`,
};
