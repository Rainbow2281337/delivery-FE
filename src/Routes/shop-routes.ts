import Login from "../pages/Login/Login";
import MainPage from "../pages/Main/Main-page";
import Registration from "../pages/Registration/Registration";
import {
  ADMIN_ROUTE,
  DEFAULT_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  RESTAURANTS_ROUTE,
} from "../consts";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/Admin/AdminPage";
import RestaurantsPage from "../pages/Restaurants/RestaurantsPage";
import { RouteItem } from "../interfaces/routeItem-interface";

export const authRoutes: RouteItem[] = [
  {
    path: HOME_ROUTE,
    Component: MainPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: RESTAURANTS_ROUTE,
    Component: RestaurantsPage,
  },
];

export const adminRoutes: RouteItem[] = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
];

export const publicRoutes: RouteItem[] = [
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: DEFAULT_ROUTE,
    Component: Login,
  },
];
