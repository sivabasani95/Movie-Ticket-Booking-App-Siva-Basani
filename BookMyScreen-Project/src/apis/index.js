import { axiosWrapper } from "./axiosWrapper";


// ==========================================================
// MOVIE APIs
// ==========================================================

// Gets all movies from the Spring Boot backend.
export const getAllMovies = () => {
  return axiosWrapper.get("/movies");
};


// Gets one movie from the backend using the movie ID.
export const getMovieById = (id) => {
  return axiosWrapper.get(`/movies/${id}`);
};


// ==========================================================
// SHOW APIs
// ==========================================================

// Gets shows from the backend using the movie,
// location, and optional date.
export const getShows = (movieId, date, location) => {

  // Creates the query parameters that will
  // be sent with the request.
  const params = {
    movieId,
    location,
  };

  // Adds the date only when the user has selected a date.
  if (date) {
    params.date = date;
  }

  // Sends a GET request to the Spring Boot shows endpoint.
  return axiosWrapper.get("/shows", {
    params,
  });
};


// Gets one show from the backend using the show ID.
export const getShowById = (id) => {
  return axiosWrapper.get(`/shows/${id}`);
};


// ==========================================================
// AUTHENTICATION APIs
// ==========================================================

// Sends the user's email to the backend
// so Spring Boot can generate and email an OTP.
export const sendOTP = (data) => {
  return axiosWrapper.post("/auth/send-otp", data);
};


// Sends the email and entered OTP to the backend
// so Spring Boot can verify the OTP.
export const verifyOTP = (data) => {
  return axiosWrapper.post("/auth/verify-otp", data);
};


// ==========================================================
// USER APIs
// ==========================================================

// Sends the user's account information to the backend
// to create a new user.
export const createUser = (data) => {
  return axiosWrapper.post("/users", data);
};


// Gets the currently signed-in user's information
// from the Spring Boot backend.
export const getUser = () => {

  // Get the access token that was saved
  // after successful OTP verification.
  const accessToken =
    localStorage.getItem("accessToken");

  // Send GET /api/users/me to Spring Boot.
  //
  // The access token is sent in the Authorization header
  // so the backend can identify the logged-in user.
  return axiosWrapper.get("/users/me", {

    headers: {

      // Spring Boot receives:
      //
      // Authorization: Bearer <accessToken>
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


// Sends the user's name and phone number
// to the backend and activates the account.
export const activateUser = (id, data) => {

  // Calls the Spring Boot endpoint:
  // PUT /api/users/activate/{id}
  return axiosWrapper.put(
    `/users/activate/${id}`,
    data
  );
};


// ==========================================================
// LOGOUT API
// ==========================================================

// Logs the current user out of the application.
export const logout = () => {
  return axiosWrapper.post("/auth/logout");
};