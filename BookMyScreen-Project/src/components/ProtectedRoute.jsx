// Imports Navigate to redirect logged-out users.
import { Navigate } from "react-router-dom";

// Imports the authentication context.
import { useAuth } from "../context/AuthContext";

// Protects pages that require login.
const ProtectedRoute = ({ children }) => {

  // Gets the login status and current user.
  const { auth, user } = useAuth();

  // Sends logged-out users back to the Home page.
  if (!auth || !user) {
    return <Navigate to="/" replace />;
  }

  // Displays the protected page for logged-in users.
  return children;
};

// Exports ProtectedRoute for use in App.jsx.
export default ProtectedRoute;