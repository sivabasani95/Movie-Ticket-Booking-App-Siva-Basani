// Import useEffect so we can run the timer every second.
import { useEffect, useState } from "react";

// This custom hook creates a countdown timer.
export const useCountdown = ({ initialTimeInSeconds = 120 }) => {

  // Store the number of seconds remaining in the countdown.
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  // Check whether the countdown has reached zero.
  const isExpired = timeLeft <= 0;

  // Run the countdown timer.
  useEffect(() => {

    // Stop the timer when it reaches zero.
    if (timeLeft <= 0) {
      return;
    }

    // Reduce the remaining time by one second.
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear the timer before creating another one.
    return () => clearTimeout(timer);

  }, [timeLeft]);

  // Convert the total seconds into minutes.
  const minutes = Math.floor(timeLeft / 60);

  // Get the remaining seconds after calculating minutes.
  const seconds = timeLeft % 60;

  // Format the timer so it displays like 02:00 or 01:09.
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // Restart the countdown back to the original time.
  const resetCountdown = () => {
    setTimeLeft(initialTimeInSeconds);
  };

  // Give these values and functions back to StepOTP.
  return {
    displayTime,
    isExpired,
    resetCountdown,
  };
};