import { Navigate } from "react-router-dom";
import { DEFAULT_ROUTE, HOME_ROUTE } from "../consts";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    return <Navigate to={DEFAULT_ROUTE} />;
  }

  return children;
};

// if user already authenticated prevent him from going to the login and registration page

interface IfUserAuthProps {
  children: React.ReactNode;
}

export const IfUserAuth: React.FC<IfUserAuthProps> = ({ children }) => {
  const token = sessionStorage.getItem("access_token");

  if (token) {
    return <Navigate to={HOME_ROUTE} />;
  }

  return children;
};
