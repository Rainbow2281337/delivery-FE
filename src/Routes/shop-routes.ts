import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_RESTAURANTS_ROUTE,
  ADMIN_RESTAURANT_DISHES_ROUTE,
  ADMIN_ROUTE,
  CART_ROUTE,
  DEFAULT_ROUTE,
  ORDERS_ROUTE,
  PROFILE_DEACTIVATE_ACCOUNT_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_PERSONAL_INFO_ROUTE,
  PROFILE_PREFERENCES_ROUTE,
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
import PersonalInfoPage from "../pages/Profile/PersonalInfoPage";
import DeactivateAccountPage from "../pages/Profile/DeactivateAccountPage";
import PreferencesPage from "../pages/Profile/PreferencesPage";
import DashboardPage from "../pages/Admin/DashboardPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import AdminRestaurantDishPage from "../pages/Admin/AdminRestaurantDishPage";
import CartPage from "../pages/Cart/CartPage";
import AvailableOrdersPage from "../pages/Orders/AvailableOrdersPage";

export const authRoutes: RouteItem[] = [
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: PROFILE_PERSONAL_INFO_ROUTE,
    Component: PersonalInfoPage,
  },
  {
    path: PROFILE_PREFERENCES_ROUTE,
    Component: PreferencesPage,
  },
  {
    path: PROFILE_DEACTIVATE_ACCOUNT_ROUTE,
    Component: DeactivateAccountPage,
  },
  {
    path: RESTAURANTS_ROUTE,
    Component: RestaurantsPage,
  },
  {
    path: RESTAURANT_ROUTE + "/:id",
    Component: RestaurantPage,
  },
  {
    path: PROFILE_ORDERS_ROUTE,
    Component: OrdersPage,
  },
  {
    path: CART_ROUTE,
    Component: CartPage,
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
  {
    path: ADMIN_RESTAURANT_DISHES_ROUTE + "/:id",
    Component: AdminRestaurantDishPage,
  },
  {
    path: ADMIN_DASHBOARD_ROUTE,
    Component: DashboardPage,
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

export const deliverymanRoutes: RouteItem[] = [
  {
    path: ORDERS_ROUTE,
    Component: AvailableOrdersPage,
  },
];
