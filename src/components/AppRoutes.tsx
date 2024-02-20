import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../Routes/shop_routes";
import { DEFAULT_ROUTE } from "../routes";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        <Route path="*" element={<Navigate to={DEFAULT_ROUTE} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
