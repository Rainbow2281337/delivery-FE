import { useDispatch } from "react-redux";
import RestaurantsTableComponent from "../../components/Admin/Content/Restaurants table/RestaurantsTableComponent";
import { AppDispatch } from "../../state/store";
import { getRestaurants } from "../../state/restaurant/restaurant-slice";
import { useEffect } from "react";
import AdminNav from "../../components/Admin/AdminNavbar/AdminNav";

const AdminRestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(getRestaurants());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);
  return (
    <>
      <AdminNav />
      <RestaurantsTableComponent />
    </>
  );
};

export default AdminRestaurantsPage;
