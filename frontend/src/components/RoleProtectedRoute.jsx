import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={
          user.role === "ADMIN"
            ? "/dashboard"
            : "/employee/dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleProtectedRoute;