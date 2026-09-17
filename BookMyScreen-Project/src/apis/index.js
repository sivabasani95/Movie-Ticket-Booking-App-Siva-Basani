import { axiosWrapper } from "./axiosWrapper";

// Gets movie data from the Spring Boot backend.
// These functions are used by React components to call our APIs.

// Gets all movies.
export const getAllMovies = () => {
  return axiosWrapper.get("/movies");
};

// Gets one movie using its ID.
export const getMovieById = (id) => {
  return axiosWrapper.get(`/movies/${id}`);
};

// Gets shows using movie, location, and optional date.
export const getShows = (movieId, date, location) => {

  // Movie ID and location are always sent to the backend.
  const params = {
    movieId,
    location,
  };

  // Date is sent only after the user selects a date.
  if (date) {
    params.date = date;
  }

  return axiosWrapper.get("/shows", {
    params,
  });
};

// Gets one show using its ID.
export const getShowById = (id) => {
  return axiosWrapper.get(`/shows/${id}`);
};