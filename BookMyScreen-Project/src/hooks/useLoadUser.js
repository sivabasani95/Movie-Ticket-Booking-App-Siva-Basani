

// Imports useEffect and useState from React.
import { useEffect, useState } from "react";

// Imports the API function that gets
// the currently logged-in user.
import { getUser } from "../apis";

// Imports AuthContext so we can save
// the logged-in user in the application.
import { useAuth } from "../context/AuthContext";


// ==========================================================
// LOAD CURRENT USER
// ==========================================================

// This hook checks whether a user is already logged in
// when the application starts or the page is refreshed.
export const useLoadUser = () => {

  // Tracks whether we are still checking
  // for a logged-in user.
  const [isLoading, setIsLoading] = useState(true);

  // Gets setUser from AuthContext.
  // We use this to save the user returned by Spring Boot.
  const { setUser } = useAuth();


  useEffect(() => {

    // ======================================================
    // FUNCTION TO LOAD THE USER
    // ======================================================

    const loadUser = async () => {

      // Get the access token that was saved
      // after successful OTP verification.
      const accessToken =
        localStorage.getItem("accessToken");


      // ====================================================
      // NO ACCESS TOKEN
      // ====================================================

      // If there is no access token,
      // the user is not currently signed in.
      if (!accessToken) {

        // Make sure AuthContext does not contain
        // an old user.
        setUser(null);

        // We finished checking authentication.
        setIsLoading(false);

        // Stop here because there is no token
        // that can be used to get the user.
        return;
      }


      // ====================================================
      // ACCESS TOKEN EXISTS
      // ====================================================

      try {

        // Calls:
        //
        // GET /api/users/me
        //
        // axiosWrapper automatically adds:
        //
        // Authorization: Bearer <accessToken>
        const response = await getUser();


        // ==================================================
        // SAVE USER
        // ==================================================

        // Spring Boot returns the logged-in user.
        //
        // Example:
        //
        // {
        //   id: 1,
        //   email: "example@gmail.com",
        //   name: "Siva Basani",
        //   phone: "3144988038",
        //   role: "user",
        //   activateUser: true
        // }
        //
        // Save that user in AuthContext.
        setUser(response.data);


      } catch (error) {

        // ==================================================
        // TOKEN INVALID OR EXPIRED
        // ==================================================

        // If /api/users/me fails,
        // remove the user from AuthContext.
        setUser(null);

        // Remove the invalid access token.
        localStorage.removeItem("accessToken");

        // Remove the refresh token too.
        localStorage.removeItem("refreshToken");

      } finally {

        // Whether the request succeeded or failed,
        // we are finished checking authentication.
        setIsLoading(false);
      }
    };


    // Run loadUser when the application starts.
    loadUser();

  }, [setUser]);


  // ========================================================
  // RETURN LOADING STATE
  // ========================================================

  // App.jsx can use this value to wait until
  // authentication checking has finished.
  return {
    isLoading,
  };
};