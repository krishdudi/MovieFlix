const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "43b66d4516ef98e7b5be1fbd31b5c3fe";

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=}`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
const BACKDROP_SIZE = "w1280";
const POSTER_SIZE = "w500";
const IMAGE_SIZE = "w300";

export {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  IMAGE_SIZE
};