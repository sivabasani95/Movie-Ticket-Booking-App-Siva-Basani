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


// Gets all seats belonging to one show.
export const getShowSeats = (showId) => {

  // Calls the Spring Boot endpoint:
  // GET /api/shows/{showId}/seats
  return axiosWrapper.get(`/shows/${showId}/seats`);
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

  // Gets the access token that was saved
  // after successful OTP verification.
  const accessToken =
    localStorage.getItem("accessToken");

  // Sends GET /api/users/me to Spring Boot.
  return axiosWrapper.get("/users/me", {

    headers: {

      // Spring Boot receives:
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
// BOOKING APIs
// ==========================================================

// Creates a new booking for the currently signed-in user.
export const createBooking = (data) => {

  // Calls the Spring Boot endpoint:
  // POST /api/bookings
  //
  // axiosWrapper automatically adds the access token
  // to the Authorization header.
  return axiosWrapper.post("/bookings", data);
};


// Gets all bookings belonging to the currently
// signed-in user.
export const getMyBookings = () => {

  // Calls the Spring Boot endpoint:
  // GET /api/bookings/me
  //
  // axiosWrapper automatically adds the access token
  // to the Authorization header.
  return axiosWrapper.get("/bookings/me");
};


// ==========================================================
// LOGOUT API
// ==========================================================

// Logs the current user out of the application.
export const logout = () => {
  return axiosWrapper.post("/auth/logout");
};