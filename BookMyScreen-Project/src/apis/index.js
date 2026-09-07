

import { axiosWrapper } from "./axiosWrapper";

// Gets movie data from the Spring Boot backend.
// These functions are used by React components to call our APIs.

export const getAllMovies = () => {
  return axiosWrapper.get("/movies");
};

export const getMovieById = (id) => {
  return axiosWrapper.get(`/movies/${id}`);
};

export const getShows = (movieId, date, location) => {
  return axiosWrapper.get("/shows", {
    params: {
      movieId,
      date,
      location,
    },
  });
};

export const getShowById = (id) => {
  return axiosWrapper.get(`/shows/${id}`);
};