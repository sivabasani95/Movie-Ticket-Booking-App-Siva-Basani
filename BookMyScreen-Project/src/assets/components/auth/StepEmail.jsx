

// Import useState so we can store and update the email entered by the user.
import { useState } from "react";

// Import the authentication context so this component can request a real OTP from the backend.
import { useAuth } from "../../../context/AuthContext";

// This component displays the first authentication step where the user enters an email.
const StepEmail = ({ onNext }) => {

  // Store the email entered by the user, starting with an empty string.
  const [email, setEmail] = useState("");

  // Get the OTP request function, loading state, and error message from AuthContext.
  const {
    sendOtpRequest,
    loading,
    authError,
  } = useAuth();

  // This function runs when the user submits the email form.
  const handleSendOtp = async (event) => {

    // Prevent the browser from refreshing the page when the form is submitted.
    event.preventDefault();

    // Remove extra spaces before and after the email address.
    const cleanEmail = email.trim();

    // Check whether the user entered an email before continuing.
    if (cleanEmail === "") {
      return;
    }

    // Ask AuthContext to call the Spring Boot backend and send a real 6-digit OTP.
    await sendOtpRequest(cleanEmail, onNext);
  };

  return (
    // When this form is submitted, call the handleSendOtp function.
    <form
      onSubmit={handleSendOtp}
      className="flex flex-col gap-3 px-10 py-6"
    >

      {/* Display the title for the email authentication step. */}
      <h2 className="text-center text-lg font-semibold">
        Enter your email
      </h2>

      {/* Explain that an account can be created if the email is not registered yet. */}
      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* Create a bordered container around the email input field. */}
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-3">

        {/* Allow the user to enter the email address where the 6-digit OTP will be sent. */}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="flex-grow outline-none text-base"
          required
        />

      </div>

      {/* Display the backend authentication error when sending the OTP fails. */}
      {authError && (
        <p className="text-center text-sm text-red-500">
          {authError}
        </p>
      )}

      {/* Send the email to Spring Boot and disable the button while the request is processing. */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Sending OTP..." : "Continue"}
      </button>

      {/* Display the Terms of Service and Privacy Policy information. */}
      <p className="text-[#c4c5c5] text-center m-auto text-[12px]">

        By entering your email id, you're agreeing to our{" "}

        {/* Display the Terms of Service link. */}
        <a href="#" className="text-[#f74565]">
          Terms of Service
        </a>

        {" "}and{" "}

        {/* Display the Privacy Policy link. */}
        <a href="#" className="text-[#f74565]">
          Privacy Policy
        </a>

        . Thanks!

      </p>

    </form>
  );
};

// Export this component so SignInModel can display the email authentication step.
export default StepEmail;