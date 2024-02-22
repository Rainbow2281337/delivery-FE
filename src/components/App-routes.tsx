import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../Routes/shop-routes";
import { DEFAULT_ROUTE } from "../consts";
import { IfUserAuth, ProtectedRoute } from "./ProtectedRoute";

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

        <Route path="*" element={<Navigate to={DEFAULT_ROUTE} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
