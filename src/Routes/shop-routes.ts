import Login from "../pages/Login/Login";
import MainPage from "../pages/Main/Main-page";
import Registration from "../pages/Registration/Registration";
import {
  ADMIN_ROUTE,
  DEFAULT_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "../consts";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/Admin/AdminPage";

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: MainPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
];

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: DEFAULT_ROUTE,
    Component: Login,
  },
];
