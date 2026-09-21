

// Import useRef to control the OTP input boxes.
import { useRef, useState } from "react";

// Import the close icon used to clear the OTP.
import { IoClose } from "react-icons/io5";

// Import the custom countdown hook used for the OTP expiration timer.
import { useCountdown } from "../../../hooks/useCountdown";

// Import AuthContext so we can verify the OTP using the Spring Boot backend.
import { useAuth } from "../../../context/AuthContext";

// Create the StepOTP component and receive onNext to move to Step 3 when needed.
const StepOTP = ({ onNext }) => {

  // Store the four OTP digits entered by the user.
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);

  // Store references to the four OTP input boxes.
  const inputRefs = useRef([]);

  // Get OTP verification, loading state, and errors from AuthContext.
  const {
    verifyOtpRequest,
    loading,
    authError,
    setAuthError,
  } = useAuth();

  // Start a two-minute countdown for OTP verification.
  const {
    displayTime,
    isExpired,
    resetCountdown,
  } = useCountdown({
    initialTimeInSeconds: 2 * 60,
  });


  // ==========================================================
  // OTP INPUT
  // ==========================================================

  // Run this function whenever the user enters a number in an OTP box.
  const handleOtpChange = (event, index) => {

    // Get the value entered in the current OTP box.
    const value = event.target.value;

    // Allow only numbers from 0 through 9.
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Allow only one number inside each OTP box.
    if (value.length > 1) {
      return;
    }

    // Create a copy of the current OTP array.
    const newOtpArray = [...otpArray];

    // Save the entered number in the correct OTP position.
    newOtpArray[index] = value;

    // Update the OTP state with the new values.
    setOtpArray(newOtpArray);

    // Remove an old error message when the user starts entering another OTP.
    if (authError) {
      setAuthError("");
    }

    // Automatically move to the next OTP box after entering a number.
    if (value && index < otpArray.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  // ==========================================================
  // BACKSPACE
  // ==========================================================

  // Run this function whenever the user presses a keyboard key.
  const handleKeyDown = (event, index) => {

    // Move to the previous OTP box when Backspace is pressed on an empty box.
    if (
      event.key === "Backspace" &&
      !otpArray[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  // ==========================================================
  // CLEAR OTP
  // ==========================================================

  // Clear all four OTP boxes when the user clicks the X button.
  const handleClearOtp = () => {

    // Reset all four OTP values.
    setOtpArray(["", "", "", ""]);

    // Remove any previous OTP error message.
    setAuthError("");

    // Move the cursor back to the first OTP box.
    inputRefs.current[0]?.focus();
  };


  // ==========================================================
  // RESEND OTP
  // ==========================================================

  // Restart the OTP screen when the current OTP has expired.
  const handleResendOtp = () => {

    // Clear the old OTP values.
    setOtpArray(["", "", "", ""]);

    // Remove the previous error message.
    setAuthError("");

    // Restart the two-minute countdown.
    resetCountdown();

    // Move the cursor back to the first OTP box.
    inputRefs.current[0]?.focus();
  };


  // ==========================================================
  // VERIFY OTP
  // ==========================================================

  // Run this function when the user clicks the Verify OTP button.
  const handleVerifyOtp = async (event) => {

    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Combine the four OTP boxes into one 4-digit OTP string.
    const enteredOtp = otpArray.join("");

    // Make sure all four OTP numbers have been entered.
    if (enteredOtp.length !== 4) {
      alert("Please enter the complete 4-digit OTP.");
      return;
    }

    // Stop verification when the two-minute OTP timer has expired.
    if (isExpired) {
      alert("OTP has expired. Please request another OTP.");
      return;
    }

    // Send the 4-digit OTP to AuthContext for backend verification.
    await verifyOtpRequest(enteredOtp, onNext);
  };


  // ==========================================================
  // OTP SCREEN
  // ==========================================================

  // Display the OTP verification form.
  return (
    <form
      onSubmit={handleVerifyOtp}
      className="flex flex-col gap-4 px-10 py-6"
    >

      {/* Display the OTP verification title. */}
      <h2 className="text-center text-lg font-semibold">
        Verify OTP
      </h2>

      {/* Tell the user to enter the 4-digit code sent to their email. */}
      <p className="text-center text-sm text-gray-500">
        Enter the 4-digit OTP sent to your email.
      </p>

      {/* Display the four OTP input boxes in one row. */}
      <div className="flex items-center justify-center gap-3">

        {/* Create one input box for each OTP digit. */}
        {otpArray.map((digit, index) => (

          <input
            key={index}

            // Save a reference to this OTP input box.
            ref={(element) => {
              inputRefs.current[index] = element;
            }}

            // Use a text input so each OTP number can be controlled separately.
            type="text"

            // Show the numeric keyboard on supported mobile devices.
            inputMode="numeric"

            // Allow only one number inside each OTP box.
            maxLength="1"

            // Display the OTP number stored at this position.
            value={digit}

            // Update the OTP when the user enters a number.
            onChange={(event) =>
              handleOtpChange(event, index)
            }

            // Handle Backspace navigation between OTP boxes.
            onKeyDown={(event) =>
              handleKeyDown(event, index)
            }

            // Style the OTP input box.
            className="h-12 w-12 rounded-md border border-gray-300 text-center text-xl outline-none focus:border-black"

            // Require every OTP box to contain a number.
            required
          />

        ))}

        {/* Clear all OTP numbers when the user clicks the X button. */}
        <button
          type="button"
          onClick={handleClearOtp}
          className="cursor-pointer text-2xl text-gray-500"
        >
          <IoClose />
        </button>

      </div>

      {/* Display the OTP expiration countdown. */}
      <p className="text-center text-sm text-gray-500">
        {isExpired
          ? "OTP expired"
          : `OTP expires in ${displayTime}`}
      </p>

      {/* Display an error returned by the Spring Boot backend. */}
      {authError && (
        <p className="text-center text-sm text-red-500">
          {authError}
        </p>
      )}

      {/* Display the Resend OTP button after the OTP expires. */}
      {isExpired && (
        <button
          type="button"
          onClick={handleResendOtp}
          className="cursor-pointer text-sm text-[#f74565]"
        >
          Resend OTP
        </button>
      )}

      {/* Send the entered OTP to Spring Boot for verification. */}
      <button
        type="submit"
        disabled={isExpired || loading}
        className="w-full cursor-pointer rounded-md bg-black py-2 text-lg text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

    </form>
  );
};

// Export StepOTP so the Sign In modal can display this component.
export default StepOTP;