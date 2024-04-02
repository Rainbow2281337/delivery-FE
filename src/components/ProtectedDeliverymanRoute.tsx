import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate } from "react-router-dom";
import { HOME_ROUTE } from "../consts";

interface ProtectedDeliverymanRouteProps {
  children: React.ReactNode;
}

const ProtectedDeliverymanRoute: React.FC<ProtectedDeliverymanRouteProps> = ({
  children,
}) => {
  const role = useSelector<RootState>((state) => state.profileInfo.role);

  if (role === "ADMIN" || role === "DELIVERYMAN") {
    return children;
  } else {
    return <Navigate to={HOME_ROUTE} />;
  }
};

export default ProtectedDeliverymanRoute;
