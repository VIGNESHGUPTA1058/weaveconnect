import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Not logged in
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  // Role mismatch
  if (loggedInUser.role !== allowedRole) {
    alert("Access denied: Unauthorized role");
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;