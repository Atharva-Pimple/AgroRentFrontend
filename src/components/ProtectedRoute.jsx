import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../services/UserServices"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
