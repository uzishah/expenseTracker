import { Navigate } from "react-router-dom";
import useAuthState from "./hooks/onAuthChange";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthState();

  if (loading) return <div>Loading...</div>; // Show a loader while checking auth state
  if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated

  return children; // Render protected content if authenticated
};

export default ProtectedRoute;
