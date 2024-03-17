import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import {
  ADMIN_RESTAURANTS_ROUTE,
  ADMIN_ROUTE,
  DEFAULT_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  RESTAURANTS_ROUTE,
  RESTAURANT_ROUTE,
} from "../consts";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/Admin/AdminPage";
import RestaurantsPage from "../pages/Restaurants/RestaurantsPage";
import { RouteItem } from "../interfaces/routeItem-interface";
import RestaurantPage from "../pages/Restaurants/RestaurantPage";
import AdminRestaurantsPage from "../pages/Admin/AdminRestaurantsPage";

export const authRoutes: RouteItem[] = [
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: RESTAURANTS_ROUTE,
    Component: RestaurantsPage,
  },
  {
    path: RESTAURANT_ROUTE + "/:id",
    Component: RestaurantPage,
  },
];

export const adminRoutes: RouteItem[] = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
  {
    path: ADMIN_RESTAURANTS_ROUTE,
    Component: AdminRestaurantsPage,
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
