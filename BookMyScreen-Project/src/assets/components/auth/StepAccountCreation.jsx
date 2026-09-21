


// Import useState so we can store and update the user's account details.
import { useState } from "react";

// Import the authentication context so we can activate the user's account.
import { useAuth } from "../../../context/AuthContext";

// This component displays the third authentication step where the user enters their account details.
const StepAccountCreation = () => {

  // Store the full name entered by the user.
  const [fullName, setFullName] = useState("");

  // Store the phone number entered by the user.
  const [phoneNumber, setPhoneNumber] = useState("");

  // Get the current user, activation function, loading state, and errors from AuthContext.
  const {
    user,
    activateUserRequest,
    loading,
    authError,
  } = useAuth();

  // This function runs when the user submits the account creation form.
  const handleCreateAccount = async (event) => {

    // Prevent the browser from refreshing when the form is submitted.
    event.preventDefault();

    // Make sure the user entered their full name.
    if (fullName.trim() === "") {
      alert("Please enter your full name.");
      return;
    }

    // Make sure the user entered their phone number.
    if (phoneNumber.trim() === "") {
      alert("Please enter your phone number.");
      return;
    }

    // Make sure the verified user information is available before activating the account.
    if (!user?.id) {
      alert("User information is missing. Please sign in again.");
      return;
    }

    // Send the user's name and phone number to Spring Boot and activate the account.
    await activateUserRequest(
      user.id,
      {
        name: fullName.trim(),
        phone: phoneNumber.trim(),
      }
    );
  };

  // Return the account creation user interface.
  return (
    <form
      onSubmit={handleCreateAccount}
      className="flex flex-col gap-3 px-10 py-6"
    >

      {/* Display the title for the account creation step. */}
      <h2 className="text-center text-lg font-semibold">
        Enter your account details
      </h2>

      {/* Explain that the user can complete their account information here. */}
      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* Allow the user to enter their full name. */}
      <input
        type="text"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        placeholder="Enter your full name"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
        required
      />

      {/* Allow the user to enter their phone number. */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        placeholder="Enter your phone number"
        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
        required
      />

      {/* Display the backend error message when account activation fails. */}
      {authError && (
        <p className="text-center text-sm text-red-500">
          {authError}
        </p>
      )}

      {/* Submit the user's account details to Spring Boot. */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-md bg-black py-2 text-lg text-white hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Display the Terms of Service and Privacy Policy information. */}
      <p className="text-[#c4c5c5] text-center m-auto text-[12px]">
        By entering your email id, you're agreeing to our{" "}

        {/* Display the Terms of Service link. */}
        <a href="#" className="text-[#f74565]">
          Terms of Service
        </a>


        {/* Display the Privacy Policy link. */}
        <a href="#" className="text-[#f74565]">
          Privacy Policy
        </a>

        . Thanks!
      </p>

    </form>
  );
};

// Export StepAccountCreation so SignInModel can display this authentication step.
export default StepAccountCreation;