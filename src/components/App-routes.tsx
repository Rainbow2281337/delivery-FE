import { Navigate, Route, Routes } from "react-router-dom";
import {
  adminRoutes,
  authRoutes,
  deliverymanRoutes,
  publicRoutes,
} from "../Routes/shop-routes";
import { IfUserAuth, ProtectedRoute } from "./ProtectedRoute";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
import { RESTAURANTS_ROUTE } from "../consts";
import ProtectedDeliverymanRoute from "./ProtectedDeliverymanRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            }
          />
        ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <IfUserAuth>
                <Component />
              </IfUserAuth>
            }
          />
        ))}

        {adminRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedAdminRoute>
                <Component />
              </ProtectedAdminRoute>
            }
          />
        ))}

        {deliverymanRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedDeliverymanRoute>
                <Component />
              </ProtectedDeliverymanRoute>
            }
          />
        ))}

        <Route path="*" element={<Navigate to={RESTAURANTS_ROUTE} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
