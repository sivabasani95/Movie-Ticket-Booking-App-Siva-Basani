// Import React tools used to create and manage the authentication context.
import {
  createContext,
  useContext,
  useState,
} from "react";

// Import useNavigate so we can move the user to another page.
import { useNavigate } from "react-router-dom";

// Import the API functions that communicate with the Spring Boot backend.
import {
  sendOTP,
  verifyOTP,
  activateUser,
  logout,
} from "../apis";


// ==========================================================
// CREATE AUTH CONTEXT
// ==========================================================

// Creates a shared authentication context for the application.
const AuthContext = createContext();


// ==========================================================
// AUTH PROVIDER
// ==========================================================

// Provides authentication information and functions
// to the rest of the React application.
export const AuthProvider = ({ children }) => {

  // Allows us to navigate to another React page.
  const navigate = useNavigate();

  // Controls whether the Sign In modal is visible.
  const [showModal, setShowModal] = useState(false);

  // Controls which authentication screen is displayed.
  // 1 = Email
  // 2 = OTP
  // 3 = Account Creation
  const [step, setStep] = useState(1);

  // Stores the email entered by the user.
  const [email, setEmail] = useState("");

  // Stores the user returned from the Spring Boot backend.
  const [user, setUser] = useState(null);

  // Stores the access token.
  // If a token already exists in localStorage,
  // load it when the application starts.
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken")
  );

  // Stores the refresh token.
  // If a token already exists in localStorage,
  // load it when the application starts.
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refreshToken")
  );

  // Controls loading messages such as
  // "Verifying..." and "Creating Account..."
  const [loading, setLoading] = useState(false);

  // Stores authentication error messages.
  const [authError, setAuthError] = useState("");


  // ==========================================================
  // OPEN / CLOSE SIGN IN MODAL
  // ==========================================================

  // Opens or closes the Sign In modal.
  const toggleModal = () => {

    // Change the current modal visibility.
    setShowModal((currentValue) => !currentValue);

    // Remove an old error message.
    setAuthError("");
  };


  // ==========================================================
  // SEND OTP
  // ==========================================================

  // Sends an OTP to the email entered by the user.
  const sendOtpRequest = async (userEmail) => {

    try {

      // Start loading.
      setLoading(true);

      // Remove any previous error.
      setAuthError("");

      // Send the email to Spring Boot.
      await sendOTP({
        email: userEmail,
      });

      // Save the email because we need it again
      // when verifying the OTP.
      setEmail(userEmail);

      // Move from Step 1 to Step 2.
      setStep(2);

      return true;

    } catch (error) {

      // Get the backend error message when available.
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to send OTP. Please try again.";

      // Display the error message.
      setAuthError(
        typeof message === "string"
          ? message
          : "Unable to send OTP. Please try again."
      );

      return false;

    } finally {

      // Stop loading.
      setLoading(false);
    }
  };


  // ==========================================================
  // VERIFY OTP
  // ==========================================================

  // Sends the email and OTP to Spring Boot for verification.
  const verifyOtpRequest = async (otp, onNext) => {

    try {

      // Start loading.
      setLoading(true);

      // Remove an old error.
      setAuthError("");

      // Send the email and OTP to Spring Boot.
      const response = await verifyOTP({
        email: email,
        otp: otp,
      });

      // Get the response data.
      const data = response.data;

      // Make sure OTP verification was successful.
      if (!data?.auth) {
        setAuthError("OTP verification failed.");
        return false;
      }

      // Get the user returned from Spring Boot.
      const verifiedUser = data.user;

      // Make sure the backend returned a user.
      if (!verifiedUser) {
        setAuthError("User information was not found.");
        return false;
      }

      // Save the verified user in AuthContext.
      setUser(verifiedUser);

      // Save the access token in React state.
      setAccessToken(data.accessToken);

      // Save the refresh token in React state.
      setRefreshToken(data.refreshToken);

      // Save the access token in localStorage.
      // This allows the token to remain available
      // after refreshing the browser.
      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      // Save the refresh token in localStorage.
      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );


      // ======================================================
      // NEW / NOT ACTIVATED USER
      // ======================================================

      // activateUser = false means the user still needs
      // to enter their name and phone number.
      if (!verifiedUser.activateUser) {

        // Move from OTP screen to Account Creation screen.
        if (onNext) {
          onNext();
        } else {
          setStep(3);
        }

        return true;
      }


      // ======================================================
      // EXISTING / ACTIVATED USER
      // ======================================================

      // The account is already activated,
      // so close the Sign In modal.
      setShowModal(false);

      // Reset the modal to Step 1.
      setStep(1);

      // Navigate the activated user to the Profile page.
      navigate("/profile");

      return true;

    } catch (error) {

      // Get the error returned by Spring Boot.
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid or expired OTP.";

      // Display the error.
      setAuthError(
        typeof message === "string"
          ? message
          : "Invalid or expired OTP."
      );

      return false;

    } finally {

      // Stop loading.
      setLoading(false);
    }
  };


  // ==========================================================
  // ACTIVATE USER
  // ==========================================================

  // Saves the new user's name and phone number
  // and activates their account.
  const activateUserRequest = async (
    userId,
    userData
  ) => {

    try {

      // Start loading.
      setLoading(true);

      // Remove an old error.
      setAuthError("");

      // Send the user's name and phone number
      // to the Spring Boot backend.
      const response = await activateUser(
        userId,
        userData
      );

      // Get the updated user returned by Spring Boot.
      const activatedUser = response.data;

      // Save the activated user in AuthContext.
      setUser(activatedUser);

      // Close the Sign In modal.
      setShowModal(false);

      // Reset the authentication modal to Step 1.
      setStep(1);

      // Navigate the newly activated user
      // to the Profile page.
      navigate("/profile");

      return true;

    } catch (error) {

      // Get the backend error when available.
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to create account.";

      // Display the error.
      setAuthError(
        typeof message === "string"
          ? message
          : "Unable to create account."
      );

      return false;

    } finally {

      // Stop loading.
      setLoading(false);
    }
  };


  // ==========================================================
  // LOGOUT
  // ==========================================================

  // Logs the current user out.
  const logoutUser = async () => {

    try {

      // Ask the Spring Boot backend to log the user out.
      await logout();

    } catch (error) {

      // Even if the backend logout fails,
      // we still clear the frontend login information.
      console.error("Logout failed:", error);

    } finally {

      // Remove the current user from React state.
      setUser(null);

      // Remove the access token from React state.
      setAccessToken(null);

      // Remove the refresh token from React state.
      setRefreshToken(null);

      // Remove the access token from localStorage.
      localStorage.removeItem("accessToken");

      // Remove the refresh token from localStorage.
      localStorage.removeItem("refreshToken");

      // Remove the stored email.
      setEmail("");

      // Reset authentication to Step 1.
      setStep(1);

      // Close the Sign In modal.
      setShowModal(false);

      // Clear old authentication errors.
      setAuthError("");

      // Return the user to the Home page.
      navigate("/");
    }
  };


  // ==========================================================
  // PROVIDE AUTH DATA
  // ==========================================================

  return (
    <AuthContext.Provider
      value={{

        // Modal
        showModal,
        setShowModal,
        toggleModal,

        // Authentication step
        step,
        setStep,

        // Email
        email,
        setEmail,

        // Current user
        user,
        setUser,

        // Tokens
        accessToken,
        refreshToken,

        // Loading and errors
        loading,
        authError,
        setAuthError,

        // Authentication functions
        sendOtpRequest,
        verifyOtpRequest,
        activateUserRequest,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ==========================================================
// USE AUTH HOOK
// ==========================================================

// Allows components to easily access AuthContext.
export const useAuth = () => {

  // Get the authentication context.
  const context = useContext(AuthContext);

  // Show a clear error if useAuth is used
  // outside of AuthProvider.
  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};