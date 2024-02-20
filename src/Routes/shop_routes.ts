import Login from "../pages/Login/Login";
import MainPage from "../pages/Main/MainPage";
import Registration from "../pages/Registration/Registration";
import { DEFAULT_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../routes";

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: MainPage,
  },
];

export const publicRoutes = [
  {
    path: DEFAULT_ROUTE,
    Component: Registration,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
