import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../Routes/shop-routes";
import { DEFAULT_ROUTE } from "../consts";
import { IfUserAuth, ProtectedRoute } from "./ProtectedRoute";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";

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

        <Route path="*" element={<Navigate to={DEFAULT_ROUTE} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
