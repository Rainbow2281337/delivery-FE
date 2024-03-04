import { Navigate } from "react-router-dom";
import { HOME_ROUTE } from "../consts";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const role = useSelector<RootState>((state) => state.profileInfo.role);

  if (role === "ADMIN") {
    return children;
  } else {
    return <Navigate to={HOME_ROUTE} />;
  }
};
