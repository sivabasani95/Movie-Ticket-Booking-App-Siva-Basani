

// Imports React for creating the Sign In modal component.
import React from "react";

// Imports the close icon displayed in the top-right corner of the modal.
import { IoClose } from "react-icons/io5";

// Imports the BookMyScreen white logo from the images folder.
import mainWhiteLogo from "../../../images/main-icon-white.png";

// Imports the authentication context hook to access modal and step state.
import { useAuth } from "../../../context/AuthContext";

// Imports the email step where the user enters their email address.
import StepEmail from "../auth/StepEmail";

// Imports the OTP step where the user enters the verification code.
import StepOTP from "../auth/StepOTP";

// Imports the account creation step for completing a new user profile.
import StepAccountCreation from "../auth/StepAccountCreation";

// Maps each authentication step number to the component that should be displayed.
const steps = {
  1: StepEmail,
  2: StepOTP,
  3: StepAccountCreation,
};

// Creates the main Sign In modal and controls the authentication steps.
const SignInModel = () => {

  // Gets the current step, modal visibility, and control functions from AuthContext.
  const { step, setStep, showModal, toggleModal } = useAuth();

  // Selects the component that should be displayed for the current authentication step.
  const Step = steps[step];

  // Moves the user to the next authentication step.
  const onNext = () => {
    setStep(step + 1);
  };

  // Prevents the Sign In modal from displaying when showModal is false.
  if (!showModal) return null;

  // Displays the Sign In modal when showModal is true.
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs">

      {/* Creates the main white container for the authentication modal. */}
      <div className="w-[90%] h-[580px] max-w-xl bg-white rounded-3xl shadow-lg animate-fadeIn overflow-hidden">

        {/* Creates the gradient header containing the logo, tagline, and close button. */}
        <div className="bg-gradient-to-r from-gray-800 to-[#f74565] text-white px-6 py-8 h-[300px] relative items-center flex flex-col justify-center">

          {/* Closes the Sign In modal when the user clicks the X icon. */}
          <IoClose
            onClick={toggleModal}
            className="absolute top-4 right-4 text-4xl cursor-pointer"
          />

          {/* Displays the BookMyScreen logo inside the modal header. */}
          <img
            src={mainWhiteLogo}
            alt="BookMyScreen"
            className="mx-auto h-24 mb-2"
          />

          {/* Displays the BookMyScreen tagline underneath the logo. */}
          <p className="text-md text-white mt-2">
            Where movies meet magic.
          </p>

        </div>

        {/* Displays the current Email, OTP, or Account Creation step. */}
        <div>
          <Step onNext={onNext} />
        </div>

      </div>
    </div>
  );
};

// Exports SignInModel so it can be displayed elsewhere in the application.
export default SignInModel;