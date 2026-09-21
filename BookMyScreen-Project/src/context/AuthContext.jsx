

// Import React tools used for authentication state.
import {
  createContext,
  useContext,
  useState,
} from "react";

// Import navigation for moving between pages.
import { useNavigate } from "react-router-dom";

// Import authentication API functions.
import {
  sendOTP,
  verifyOTP,
  activateUser,
  logout,
} from "../apis";


// ==========================================================
// CREATE AUTH CONTEXT
// ==========================================================

// Create a shared authentication context.
const AuthContext = createContext();


// ==========================================================
// AUTH PROVIDER
// ==========================================================

// Provide authentication data to the application.
export const AuthProvider = ({ children }) => {

  // Allow navigation to another page.
  const navigate = useNavigate();

  // Control whether the Sign In modal is visible.
  const [showModal, setShowModal] = useState(false);

  // Store the current authentication screen.
  const [step, setStep] = useState(1);

  // Store the email entered by the user.
  const [email, setEmail] = useState("");

  // Store the currently logged-in user.
  const [user, setUser] = useState(null);

  // Load the saved access token when React starts.
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken")
  );

  // Load the saved refresh token when React starts.
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refreshToken")
  );

  // Store whether an authentication request is loading.
  const [loading, setLoading] = useState(false);

  // Store authentication error messages.
  const [authError, setAuthError] = useState("");

  // User is authenticated when an access token exists.
  const auth = Boolean(accessToken);


  // ==========================================================
  // OPEN / CLOSE SIGN IN MODAL
  // ==========================================================

  // Open or close the Sign In modal.
  const toggleModal = () => {

    // Change the current modal visibility.
    setShowModal((currentValue) => !currentValue);

    // Clear an old authentication error.
    setAuthError("");
  };


  // ==========================================================
  // SEND OTP
  // ==========================================================

  // Send an OTP to the user's email.
  const sendOtpRequest = async (userEmail) => {

    try {

      // Start the loading state.
      setLoading(true);

      // Clear an old authentication error.
      setAuthError("");

      // Send the email to Spring Boot.
      await sendOTP({
        email: userEmail,
      });

      // Save the email for OTP verification.
      setEmail(userEmail);

      // Move to the OTP screen.
      setStep(2);

      // Tell the component the request succeeded.
      return true;

    } catch (error) {

      // Get the backend error message.
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to send OTP. Please try again.";

      // Save the error message.
      setAuthError(
        typeof message === "string"
          ? message
          : "Unable to send OTP. Please try again."
      );

      // Tell the component the request failed.
      return false;

    } finally {

      // Stop the loading state.
      setLoading(false);
    }
  };


  // ==========================================================
  // VERIFY OTP
  // ==========================================================

  // Verify the OTP entered by the user.
  const verifyOtpRequest = async (otp, onNext) => {

    try {

      // Start the loading state.
      setLoading(true);

      // Clear an old authentication error.
      setAuthError("");

      // Send the email and OTP to Spring Boot.
      const response = await verifyOTP({
        email: email,
        otp: otp,
      });

      // Get the backend response data.
      const data = response.data;

      // Stop if OTP verification failed.
      if (!data?.auth) {
        setAuthError("OTP verification failed.");
        return false;
      }

      // Get the verified user.
      const verifiedUser = data.user;

      // Stop if the backend did not return a user.
      if (!verifiedUser) {
        setAuthError("User information was not found.");
        return false;
      }

      // Save the logged-in user.
      setUser(verifiedUser);

      // Save the access token in React state.
      setAccessToken(data.accessToken);

      // Save the refresh token in React state.
      setRefreshToken(data.refreshToken);

      // Save the access token in the browser.
      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      // Save the refresh token in the browser.
      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );


      // ======================================================
      // NEW USER
      // ======================================================

      // Check whether the user still needs account setup.
      if (!verifiedUser.activateUser) {

        // Move to the account creation screen.
        if (onNext) {
          onNext();
        } else {
          setStep(3);
        }

        // Finish the function.
        return true;
      }


      // ======================================================
      // EXISTING USER
      // ======================================================

      // Close the Sign In modal.
      setShowModal(false);

      // Reset the modal to the email screen.
      setStep(1);

      // Navigate the logged-in user to Profile.
      navigate("/profile");

      // Tell the component login succeeded.
      return true;

    } catch (error) {

      // Get the backend error message.
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid or expired OTP.";

      // Save the authentication error.
      setAuthError(
        typeof message === "string"
          ? message
          : "Invalid or expired OTP."
      );

      // Tell the component login failed.
      return false;

    } finally {

      // Stop the loading state.
      setLoading(false);
    }
  };


  // ==========================================================
  // ACTIVATE USER
  // ==========================================================

  // Complete account setup for a new user.
  const activateUserRequest = async (
    userId,
    userData
  ) => {

    try {

      // Start the loading state.
      setLoading(true);

      // Clear an old authentication error.
      setAuthError("");

      // Send the user's information to Spring Boot.
      const response = await activateUser(
        userId,
        userData
      );

      // Get the activated user.
      const activatedUser = response.data;

      // Save the activated user.
      setUser(activatedUser);

      // Close the Sign In modal.
      setShowModal(false);

      // Reset the modal to Step 1.
      setStep(1);

      // Navigate the user to Profile.
      navigate("/profile");

      // Tell the component activation succeeded.
      return true;

    } catch (error) {

      // Get the backend error message.
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to create account.";

      // Save the authentication error.
      setAuthError(
        typeof message === "string"
          ? message
          : "Unable to create account."
      );

      // Tell the component activation failed.
      return false;

    } finally {

      // Stop the loading state.
      setLoading(false);
    }
  };


  // ==========================================================
  // LOGOUT
  // ==========================================================

  // Log out the currently logged-in user.
  const logoutUser = async () => {

    try {

      // Ask Spring Boot to log the user out.
      await logout();

    } catch (error) {

      // Show the error without stopping frontend logout.
      console.error("Logout failed:", error);

    } finally {

      // Remove the logged-in user.
      setUser(null);

      // Remove the access token from React.
      setAccessToken(null);

      // Remove the refresh token from React.
      setRefreshToken(null);

      // Remove the access token from the browser.
      localStorage.removeItem("accessToken");

      // Remove the refresh token from the browser.
      localStorage.removeItem("refreshToken");

      // Clear the stored email.
      setEmail("");

      // Reset the authentication screen.
      setStep(1);

      // Close the Sign In modal.
      setShowModal(false);

      // Clear authentication errors.
      setAuthError("");

      // Return the user to the Home page.
      navigate("/");
    }
  };


  // ==========================================================
  // PROVIDE AUTH DATA
  // ==========================================================

  // Share authentication information with the application.
  return (
    <AuthContext.Provider
      value={{

        // Login status.
        auth,

        // Modal information.
        showModal,
        setShowModal,
        toggleModal,

        // Authentication step.
        step,
        setStep,

        // User email.
        email,
        setEmail,

        // Logged-in user.
        user,
        setUser,

        // Authentication tokens.
        accessToken,
        refreshToken,

        // Loading and errors.
        loading,
        authError,
        setAuthError,

        // Authentication functions.
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

// Allow components to access AuthContext.
export const useAuth = () => {

  // Get the authentication context.
  const context = useContext(AuthContext);

  // Stop if useAuth is outside AuthProvider.
  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  // Return the authentication context.
  return context;
};